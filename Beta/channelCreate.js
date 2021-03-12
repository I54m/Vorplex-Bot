const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, channel) => {
  if (channel.type === "dm" || channel.type === "group") return;
  if (channel.name.startsWith(`ticket-`)) return;
  let loggingchannel = channel.guild.channels.find(`name`, botconfig.loggingchannel);
  if (!loggingchannel) return;
  let embedColour = botconfig.embedColour;
  channel.guild.fetchAuditLogs().then(audit => {
    let user = audit.entries.filter(entry => entry.action == "CHANNEL_CREATE").last().executor;
    let time = channel.createdAt;
    let type = channel.type;
    let name = channel.name;
    let channelEmbed = new Discord.RichEmbed()
    .setDescription(`<@${user.id}> created a ${type} channel!`)
    .setColor(embedColour)
    .addField(`Channel name`, `${name}`)
    .addField(`Created on`, `${time}`);
    loggingchannel.send(channelEmbed);
  }).catch(err => {
    loggingchannel.send(`Could not log channel creation! ERROR: ${err}`)
  });
}

module.exports.help = {
  name: "channelCreate"
}
