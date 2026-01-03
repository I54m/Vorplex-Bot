const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    const tickets = JSON.parse(fs.readFileSync("./tickets.json", "utf8"));

    let potentialTicket = "ticket-" + message.author.id.substring(0, 8);

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && message.channel.name !== potentialTicket)
        return message.reply("Sorry, you can't do that!");

    if (!message.channel.name.startsWith("ticket-"))
        return message.reply("This is not a ticket channel.");

    await message.channel.send({
        embeds: [new EmbedBuilder().setColor(botconfig.embedColour).setDescription("Ticket closing in 3 seconds...")]
    });

    setTimeout(async () => {
        let ticketOwner = "unknown";
        const keys = Object.keys(tickets);
        const ticketId = message.channel.name.substring(7, 15);

        keys.forEach(key => {
            if (key.startsWith(ticketId) && tickets[key].ticket === message.channel.id) {
                if (ticketOwner === "unknown") ticketOwner = key;
            }
        });

        if (ticketOwner !== "unknown") {
            tickets[ticketOwner] = {};
            fs.writeFileSync("./tickets.json", JSON.stringify(tickets, null, 2));
        }

        const loggingChannel = message.guild.channels.cache.find(ch => ch.name === botconfig.loggingchannel);
        if (loggingChannel) {
            const channelEmbed = new EmbedBuilder()
                .setDescription(`${message.author} closed a Ticket!`)
                .setColor(botconfig.embedColour)
                .addFields(
                    { name: "Ticket channel name", value: message.channel.name },
                    { name: "Created on", value: `${message.channel.createdAt}` }
                );
            if (ticketOwner !== "unknown") channelEmbed.addFields({ name: "Ticket Owner", value: `<@${ticketOwner}>` });

            loggingChannel.send({ embeds: [channelEmbed] });
        }

        await message.channel.delete();
    }, ms("3s"));
};

module.exports.help = {
    name: "close",
    permission: "MANAGE_MESSAGES",
    usage: "",
    description: "Close an open ticket!"
};
