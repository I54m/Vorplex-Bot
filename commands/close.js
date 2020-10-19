const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let tickets = JSON.parse(fs.readFileSync("./tickets.json", "utf8"));

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry You can't do that!");

    if (!message.channel.name.startsWith(`ticket-`)) return message.reply("Sorry but this is not a ticket channel, if you would like to close your current ticket then please go to the channel then try the command again");

    message.channel.send(new Discord.RichEmbed().setColor(botconfig.embedColour).setDescription(`Ticket closing in 3 seconds...`));
    setTimeout(async function () {
        let ticketOwner = "unknown";
        let keys = Object.keys(tickets);
        let ticketId = message.channel.name.substring(7, 15);
        keys.forEach(key => {
            if (key.startsWith(ticketId) && tickets[key].ticket) {
                if (tickets[key].ticket === message.channel.id)
                    if (ticketOwner == "unknown") ticketOwner = key;
            }
        });
        if (ticketOwner != "unknown") {
            tickets[ticketOwner] = {};

            fs.writeFile("./tickets.json", JSON.stringify(tickets), (err) => {
                if (err) console.log(err)
            });
        }
        let loggingchannel = message.channel.guild.channels.find(`name`, botconfig.loggingchannel);
        if (!loggingchannel) return;
        let embedColour = botconfig.embedColour;
        let time = message.channel.createdAt;
        let name = message.channel.name;
        let channelEmbed = new Discord.RichEmbed()
            .setDescription(`${message.author} closed a Ticket!`)
            .setColor(embedColour)
            .addField(`Ticket channel name`, `${name}`)
            .addField(`Created on`, `${time}`);
        if (ticketOwner != "unknown") channelEmbed.addField(`Ticket Owner`, `<@${ticketOwner}>`);
        loggingchannel.send(channelEmbed);
        await message.channel.delete();
    }, ms('3s'));
}

module.exports.help = {
    name: "close",
    permission: "MANAGE_MESSAGES",
    usage: "",
    description: "Close an open ticket!"
}
