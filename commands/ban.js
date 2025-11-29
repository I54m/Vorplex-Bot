const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {

    // Permission check
    if (!message.member.permissions.has(PermissionsBitField.Flags.BAN_MEMBERS))
        return message.channel.send("Sorry you can't do that!");

    // Get the target member (v14 method)
    const bUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

    if (!bUser)
        return message.channel.send("Couldn't find user!");

    // Prevent banning staff
    if (bUser.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        return message.channel.send("That person can't be banned!");

    // Reason
    const bReason = args.slice(1).join(" ") || "No reason provided";

    // Build log embed
    const banEmbed = new EmbedBuilder()
        .setDescription("Ban")
        .setColor("#bc0000")
        .addFields(
            { name: "Banned User", value: `${bUser} (ID: ${bUser.id})` },
            { name: "Banned By", value: `<@${message.author.id}> (ID: ${message.author.id})` },
            { name: "Banned in", value: `${message.channel}` },
            { name: "Time", value: `${message.createdAt}` },
            { name: "Reason", value: bReason }
        );

    // Find incidents log channel
    const incidentschannel = message.guild.channels.cache.find(
        ch => ch.name === botconfig.incidentschannel
    );

    if (!incidentschannel)
        return message.channel.send("Couldn't find incidents channel!");

    // Delete the command message
    message.delete().catch(() => {});

    // Perform ban
    await bUser.ban({ reason: bReason });

    // Log the ban
    incidentschannel.send({ embeds: [banEmbed] });
};


module.exports.help = {
    name: "ban",
    permission: "BAN_MEMBERS",
    usage: "<@user> <reason>",
    description: "Ban a player from the discord."
}
