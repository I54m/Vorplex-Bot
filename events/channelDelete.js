const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, channel) => {
  if (channel.type === "dm" || channel.type === "group") return;
  if (channel.name.startsWith(`ticket-`)) return;
  let loggingchannel = channel.guild.channels.find(`name`, botconfig.loggingchannel);
  if (!loggingchannel) return;
  let embedColour = botconfig.embedColour;
  channel.guild.fetchAuditLogs().then(audit => {
    let user = audit.entries.filter(entry => entry.action == "CHANNEL_DELETE").last().executor;
    let type = channel.type;
    let name = channel.name;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
      dd = '0'+dd;
    }
    if(mm<10) {
      mm = '0'+mm;
    }
    today = mm + '/' + dd + '/' + yyyy;
    let channelEmbed = new Discord.RichEmbed()
    .setDescription(`<@${user.id}> deleted a ${type} channel!`)
    .setColor(embedColour)
    .addField(`Channel name`, `${name}`)
    .addField(`Date Deleted`, `${today}`);
    loggingchannel.send(channelEmbed);
  }).catch(err => {
    loggingchannel.send(`Could not log channel deletion! ERROR: ${err}`)
  });
}

module.exports.help = {
  name: "channelDelete"
}
