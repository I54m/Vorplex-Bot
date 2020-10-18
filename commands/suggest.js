const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {
    return message.reply("We are currently not taking suggestions! Thank you for your interest though!");
    let suggestChannel = message.guild.channels.find("name", botconfig.suggestionschannel);
    if (!suggestChannel) return message.channel.send(`:x: Could not find the suggestions channel!`);
    let suggest = args.join(" ").slice(0);

    if (!suggest) return message.channel.send(`:x:Please use \`${botconfig.prefix}suggest <message>\``);

    let embed = new Discord.RichEmbed()
        .setTitle("Suggestion")
        .setAuthor(`Left by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`${suggest}`)
        .setColor(botconfig.embedColour)
        .setFooter(`© ${message.guild.name}`);

    message.delete();

    suggestChannel.send(embed).then(embedMessage => {
	  embedMessage.react('👍');
      embedMessage.react('👎');
	});
}

module.exports.help = {
    name: "suggest",
    permission: "NONE",
    usage: "<message>",
    description: "Suggest something to be added to the server!"
}
