const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const messagelist = require("./../messages.json");

module.exports.run = async (bot, member) => {
  let welcomechannel = member.guild.channels.find(`name`, botconfig.welcomechannel);
  if (!welcomechannel) return;
  let embedColour = botconfig.embedColour;
  let messageArray = messagelist.welcomemessages;
  let messageNumber = Math.floor(Math.random() * messageArray.length);
  let message = messageArray[messageNumber];
  if (message.includes("{number}")){
    let number = Math.floor(Math.random() * 3678);
    message = message.replace(`{number}`, `${number}`);
  }
  let welcomeEmbed = new Discord.RichEmbed()
  .setTitle(`**Welcome ${member.displayName} to the Vorplex Server Discord!**`)
  .setColor(`${embedColour}`)
  .setDescription(message.replace(`{user}`, `${member.user.tag}`))
  .addField("Rules & Info", `${member.guild.channels.find(`name`, botconfig.rulesinfochannel).toString()}`, true)
  .setThumbnail("https://api.54mpenguin.com/Vorplex/Vorplex-Server-Icon-x1000.png")
  .setFooter(`Total: ${member.guild.memberCount} members`);
  welcomechannel.send(welcomeEmbed);
  if (!botconfig.joinrole) return;
  let joinrole = member.guild.roles.find(`name`, botconfig.joinrole);
  if (!joinrole) return console.log("Unable to find join role!");
  await(member.addRole(joinrole.id));
}

module.exports.help = {
  name: "guildMemberAdd"
}
