const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embedColour = botconfig.embedColour;
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Couldn't find user!");
    let bReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry you can't do that!");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");
    let banEmbed = new Discord.MessageEmbed()
        .setDescription("~~Ban~~")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with Id ${message.author.id}`)
        .addField("Banned in", message.channel)
        .addField("Time", message.createdAt);
    if (bReason) {
        banEmbed.addField("Reason", bReason);
    }
    let incidentschannel = message.guild.channels.find(`name`, botconfig.incidentschannel);
    if (!incidentschannel) return message.channel.send("Couldn't find incidents channel!");
    message.delete().catch(O_o => {});
    message.guild.member(bUser).ban(bReason);
    incidentschannel.send(banEmbed);
    return;
}

module.exports.help = {
    name: "ban",
    permission: "BAN_MEMBERS",
    usage: "<@user> <reason>",
    description: "Ban a player from the discord."
}
