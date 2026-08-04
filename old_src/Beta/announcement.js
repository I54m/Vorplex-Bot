const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let announcementsChannel = message.guild.channels.find("name", botconfig.announcementsChannel);
	if (!announcementsChannel) return message.reply(`:x: Could not find the announcements channel!`);

	var announcement = args.map((x) => x);
	announcement.shift();

	let announcementEmbed = new Discord.RichEmbed()
		.setThumbnail(message.author.avatarURL)
		.setTimestamp()
		.setFooter(`${message.guild.name}`, message.guild.iconURL)
		.setColor(botconfig.embedColour)
		.addField("Announcement", announcement.join(" "));

	announcementsChannel.send(`<@${args[0]}>`);
	announcementsChannel.send(announcementEmbed);
	if (message.channel === announcementsChannel) message.delete()
}

module.exports.help = {
	name: "announcement",
	permission: "ADMINISTRATOR",
	usage: "<tag> <message>",
	description: "Makes an announcement that is nicely formatted and embeded into the chat."
}