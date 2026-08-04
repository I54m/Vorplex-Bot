const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	return message.reply("Command is not ready for use!");
}

module.exports.help = {
	name: "changelog",
	permission: "ADMINISTRATOR",
	usage: "",
	description: ""
}