const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) =>{
    let helpEmbed = new Discord.RichEmbed()
        .setDescription(`Commands <@${message.member.id}> has permission to use`)
        .setColor(botconfig.embedColour)
        .addField("Key", "<> = required argument [] = optional argument");

    bot.commands.forEach((props) => {
        if (message.member.hasPermission(props.help.permission))
            helpEmbed.addField(`${botconfig.prefix}${props.help.name} ${props.help.usage}`, `${props.help.description}`);
    })
    message.channel.send(helpEmbed);
}

module.exports.help = {
  name: "help",
  permission: "NONE",
  usage: "",
  description: "View this help menu."
}
