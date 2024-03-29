const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  let embedColour = botconfig.embedColour;
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.MessageEmbed()
  .setDescription("Server Information")
  .setColor(`${embedColour}`)
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Created On", message.guild.createdAt)
  .addField("You Joined", message.member.joinedAt)
  .addField("Total Members", message.guild.memberCount);
  return message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo",
  permission: "NONE",
  usage: "",
  description: "View basic information about the discord server"
}
