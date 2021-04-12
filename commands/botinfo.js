const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
  let embedColour = botconfig.embedColour;
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.MessageEmbed()
  .setDescription("Bot Imformation")
  .setColor(`${embedColour}`)
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt)
  .addField("Developer", "I54m");
  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  permission: "NONE",
  usage: "",
  description: "View simple information about the bot."
}
