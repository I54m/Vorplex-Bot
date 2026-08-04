const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const rUser = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!rUser) return message.channel.send("Couldn't find user!");

    const reason = args.slice(1).join(" ") || "No reason provided";
    const reportEmbed = new EmbedBuilder()
        .setDescription("Reports")
        .setColor(botconfig.embedColour)
        .addFields(
            { name: "Reported User", value: `${rUser} with ID: ${rUser.id}` },
            { name: "Reported By", value: `${message.author} with ID: ${message.author.id}` },
            { name: "Channel", value: `${message.channel}` },
            { name: "Time", value: `${message.createdAt}` },
            { name: "Reason", value: reason }
        );

    const reportsChannel = message.guild.channels.cache.find(ch => ch.name === botconfig.reportschannel);
    if (!reportsChannel) return message.channel.send("Couldn't find reports channel!");

    await message.delete().catch(() => {});
    reportsChannel.send({ embeds: [reportEmbed] });
};

module.exports.help = {
    name: "report",
    permission: "NONE",
    usage: "<@user> <reason>",
    description: "Report a player for breaking the rules."
};
