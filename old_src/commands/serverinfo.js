const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const embedColour = botconfig.embedColour;
    const sicon = message.guild.iconURL();

    const serverEmbed = new EmbedBuilder()
        .setDescription("Server Information")
        .setColor(embedColour)
        .setThumbnail(sicon)
        .addFields(
            { name: "Server Name", value: message.guild.name, inline: true },
            { name: "Created On", value: `${message.guild.createdAt}`, inline: true },
            { name: "You Joined", value: `${message.member.joinedAt}`, inline: true },
            { name: "Total Members", value: `${message.guild.memberCount}`, inline: true }
        );

    return message.channel.send({ embeds: [serverEmbed] });
};

module.exports.help = {
    name: "serverinfo",
    permission: "NONE",
    usage: "",
    description: "View basic information about the discord server"
};
