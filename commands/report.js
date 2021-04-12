const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{//report maybe make it so they react to the message that they want to report
  let embedColour = botconfig.embedColour;
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser)return message.channel.send("Couldn't find user!");
  let reason = args.join(" ").slice(22);
  let reportEmbed = new Discord.MessageEmbed()
  .setDescription("Reports")
  .setColor(`${embedColour}`)
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);
  let reportschannel = message.guild.channels.find(`name`, botconfig.reportschannel);
  if(!reportschannel) return message.channel.send("Couldn't find reports channel!");
  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
  return;
}

module.exports.help = {
  name: "report",
  permission: "NONE",
  usage: "<@user> <reason>",
  description: "Report a player for breaking the rules."
}
