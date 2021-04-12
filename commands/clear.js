const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry You can't do that!");
  if (!args[0]) return message.reply(`You need to specify an amount of messages to clear: ${botconfig.prefix}clear <number of messages> [user]`);
  if (isNaN(args[0])) return message.reply(`${args[0]} is not a number of messages!`);
  args[0]++;
  if (args[0] >= 100){
   args[0] = 99;
  }
  let incidentschannel = message.guild.channels.find("name", botconfig.incidentschannel);
  let channelcleared = message.channel;
  let clearer = message.member;
  let user;
  if (!args[1]){
    message.channel.bulkDelete(args[0]).catch(error =>{
       message.channel.send(`ERROR: ${error}`);
       return;
      }).then(() =>{
      message.channel.send(`Cleared ${(args[0] -1)} messages.`).then(msg => msg.delete(5000));
    });
    user = "all";
  } else {
    let toclear = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    if(!toclear) return message.reply("couldn't find user!");
    const fetched = await message.channel.fetchMessages({limit: args[0]});
    const messagestoclear = fetched.filter(messagetoclear => messagetoclear.author.id == toclear.id);
    message.channel.bulkDelete(messagestoclear).catch(error => {
      message.channel.send(`ERROR: ${error}`);
    }).then(() =>{
      message.channel.send(`Cleared ${(args[0] -1)} messages.`).then(msg => msg.delete(5000));
    });
    user = `<@${toclear.id}>`;
  }
  let clearEmbed = new Discord.MessageEmbed()
  .setDescription("~~Clear~~")
  .setColor("#e5de16")
  .addField(`Channel Cleared`, channelcleared)
  .addField(`Cleared By`, `<@${clearer.id}>`)
  .addField(`Amount Cleared`, (args[0] -1))
  .addField(`User Cleared`, user);
  incidentschannel.send(clearEmbed);
}

module.exports.help = {
  name: "clear",
  permission: "MANAGE_MESSAGES",
  usage: "<amount> [@user]",
  description: "Clear a certain amount of message in a channel or by user in the channel."
}
