const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const fs = require("fs");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    let tickets = JSON.parse(fs.readFileSync("./tickets.json", "utf8"));

    let ticketCategory = message.guild.channels.find("name", botconfig.ticketcategory);
    if (!ticketCategory) return message.channel.send(`:x: Could not find the tickets category!`);

    var subject = args.join(" ").slice(0);
    if (!subject) subject = 'No Subject'

    if (tickets[message.author.id]) {
        if (tickets[message.author.id].ticket) {
            var ticketChannel = message.guild.channels.find("id", tickets[message.author.id].ticket);
            if (ticketChannel)
                return message.reply(`You already have an open ticket: ${ticketChannel}`);
            else
                tickets[message.author.id] = {};
        }
    }

    let ticketID = message.author.id.substring(0, 8);

    await message.guild.createChannel(`ticket-${ticketID}`, 'text').then(async c => {
        c.setParent(ticketCategory);
        await c.setTopic(`If you are done with the ticket please do ${botconfig.prefix}close`);
        c.overwritePermissions(c.guild.defaultRole, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
        })
        c.overwritePermissions(message.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        c.overwritePermissions(message.guild.roles.find("name", botconfig.staffrole), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })

        let embed = new Discord.RichEmbed()
            .setDescription(`Dear ${message.author},\n\nThank you for reaching out to our staff team!
We will get back to you as soon as possible.
In the mean time please provide as much information as you can so that we can help you better!
**Pinging staff will not help you get noticed, just be paitent will be with you as soon as we can!!**\n`)
            .addField(`Subject`, `${subject}`)
            .setTimestamp()
            .setFooter(`© ${message.guild.name}`, message.guild.iconURL)
            .setColor(botconfig.embedColour);

        c.send(embed);
        message.channel.send(new Discord.RichEmbed().setColor(botconfig.embedColour).setDescription(`:white_check_mark: Your ticket has been created ${c}`));
        setTimeout(async function () {
            tickets[message.author.id] = {
                ticket: `${c.id}`
            };

            fs.writeFile("./tickets.json", JSON.stringify(tickets), (err) => {
                if (err) console.log(err)
            });
            let loggingchannel = c.guild.channels.find(`name`, botconfig.loggingchannel);
            if (!loggingchannel) return;
            let embedColour = botconfig.embedColour;
            let time = c.createdAt;
            let name = c.name;
            let channelEmbed = new Discord.RichEmbed()
                .setDescription(`${message.author} created a Ticket!`)
                .setColor(embedColour)
                .addField(`Ticket channel name`, `${name}`)
                .addField(`Created on`, `${time}`)
                .addField(`Subject`, `${subject}`);
            loggingchannel.send(channelEmbed);
            await message.delete();
        }, ms('1s'));
    });
}

module.exports.help = {
    name: "ticket",
    permission: "NONE",
    usage: "<subject>",
    description: "Open a support ticket with our staff team!"
}

