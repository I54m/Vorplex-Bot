const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const botconfig = require("./../botconfig.json");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let tickets = JSON.parse(fs.readFileSync("./tickets.json", "utf8"));

    const ticketCategory = message.guild.channels.cache.find(ch => ch.name === botconfig.ticketcategory && ch.type === ChannelType.GuildCategory);
    if (!ticketCategory) return message.channel.send(":x: Could not find the tickets category!");

    const subject = args.join(" ") || 'No Subject';

    if (tickets[message.author.id]?.ticket) {
        const existingTicket = message.guild.channels.cache.get(tickets[message.author.id].ticket);
        if (existingTicket) return message.reply(`You already have an open ticket: ${existingTicket}`);
        else tickets[message.author.id] = {};
    }

    const ticketID = message.author.id.substring(0, 8);

    const c = await message.guild.channels.create({
        name: `ticket-${ticketID}`,
        type: ChannelType.GuildText,
        parent: ticketCategory.id,
        topic: `If you are done with the ticket please do ${botconfig.prefix}close`
    });

    const staffRole = message.guild.roles.cache.find(r => r.name === botconfig.staffrole);

    await c.permissionOverwrites.set([
        { id: message.guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
        { id: message.author.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
        staffRole ? { id: staffRole.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] } : {}
    ].filter(Boolean));

    const embed = new EmbedBuilder()
        .setDescription(`Dear ${message.author},\n\nThank you for reaching out to our staff team! We will get back to you as soon as possible. In the mean time please provide as much information as you can so that we can help you better! **Pinging staff will not help you get noticed, just be paitent will be with you as soon as we can!!**\nnTo close this ticket, please use the command \`${botconfig.prefix}close\`.`)
        .addFields({ name: "Subject", value: subject })
        .setTimestamp()
        .setFooter({ text: `© ${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setColor(botconfig.embedColour);

    await c.send({ embeds: [embed] });
    await message.channel.send({ embeds: [new EmbedBuilder().setColor(botconfig.embedColour).setDescription(`:white_check_mark: Your ticket has been created ${c}`)] });
    
    setTimeout(async function () {
        // Store ticket
        tickets[message.author.id] = { ticket: c.id };
        fs.writeFileSync("./tickets.json", JSON.stringify(tickets, null, 2));

        // Optional logging
        const loggingChannel = message.guild.channels.cache.find(ch => ch.name === botconfig.loggingchannel);
        if (loggingChannel) {
            const logEmbed = new EmbedBuilder()
                .setDescription(`${message.author} created a Ticket!`)
                .setColor(botconfig.embedColour)
                .addFields(
                    { name: "Ticket channel name", value: c.name },
                    { name: "Created on", value: `${c.createdAt}` },
                    { name: "Subject", value: subject }
                );
            loggingChannel.send({ embeds: [logEmbed] });
        }
    }, ms('1s'));

    await message.delete().catch(() => {});
};

module.exports.help = {
    name: "ticket",
    permission: "NONE",
    usage: "<subject>",
    description: "Open a support ticket with our staff team!"
}

