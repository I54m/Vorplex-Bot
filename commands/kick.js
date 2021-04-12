const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  let embedColour = botconfig.embedColour;
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser)return message.channel.send("Couldn't find user!");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send("Sorry you can't do that!");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  let kickEmbed = new Discord.MessageEmbed()
  .setDescription("~~Kick~~")
  .setColor("#e56b00")
  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with Id ${message.author.id}`)
  .addField("Kicked in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);
  let incidentschannel = message.guild.channels.find(`name`, botconfig.incidentschannel);
  if(!incidentschannel) return message.channel.send("Couldn't find incidents channel!");
  message.delete().catch(O_o=>{});
  message.guild.member(kUser).kick(kReason);
  incidentschannel.send(kickEmbed);
  return;
}

module.exports.help = {
  name: "kick",
  permission: "MANAGE_MESSAGES",
  usage: "<@user> <reason>",
  description: "Kick a player from the discord."
}
