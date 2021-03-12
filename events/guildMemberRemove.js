const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const messagelist = require("./../messages.json");

module.exports.run = async (bot, member) => {
  let leavechannel = member.guild.channels.find(`name`, botconfig.leavechannel);
  if (!leavechannel) return;
  let embedColour = botconfig.embedColour;
  let messageArray = messagelist.goodbyemessages;
  let messageNumber = Math.floor(Math.random() * messageArray.length);
  let message = messageArray[messageNumber];
  if (message.includes("{number}")){
    let number = Math.floor(Math.random() * 3678);
    message = message.replace(`{number}`, `${number}`);
  }
  let goodbyeEmbed = new Discord.RichEmbed()
  .setTitle(`**Goodbye ${member.displayName}!**`)
  .setColor(`${embedColour}`)
  .setDescription(message.replace(`{user}`, `${member.user.tag}`))
  .setThumbnail("https://api.54m.com/Vorplex/Vorplex-Server-Icon-x1000.png")
  .setFooter(`Total: ${member.guild.memberCount} members`);
  leavechannel.send(goodbyeEmbed);
}

module.exports.help = {
  name: "guildMemberRemove"
}
