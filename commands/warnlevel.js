const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!wUser) return message.reply("Couldn't find that user!");
    if (!warns[wUser.id].warns) return message.reply(`<@${wUser.id}> has no warnings!`);
    let warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);

}

module.exports.help = {
    name: "warnlevel",
    permission: "NONE",
    usage: "<@user>",
    description: "View how many warns a user has."
}
