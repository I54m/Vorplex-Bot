const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {

    // permission check (v14)
    if (!message.member.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        return message.channel.send("Sorry you can't do that!");

    // get target member (v14 method)
    const kUser =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

    if (!kUser)
        return message.channel.send("Couldn't find user!");

    // prevent kicking staff
    if (kUser.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        return message.channel.send("That person can't be kicked!");

    const kReason = args.slice(1).join(" ") || "No reason provided";

    const kickEmbed = new EmbedBuilder()
        .setDescription("Kick")
        .setColor("#e56b00")
        .addFields(
            { name: "Kicked User", value: `${kUser} (ID: ${kUser.id})` },
            { name: "Kicked By", value: `<@${message.author.id}> (ID: ${message.author.id})` },
            { name: "Kicked in", value: `${message.channel}` },
            { name: "Time", value: `${message.createdAt}` },
            { name: "Reason", value: kReason }
        );

    // channel lookup (v14)
    const incidentschannel = message.guild.channels.cache.find(
        ch => ch.name === botconfig.incidentschannel
    );

    if (!incidentschannel)
        return message.channel.send("Couldn't find incidents channel!");

    // delete command message
    message.delete().catch(() => {});

    // perform kick
    await kUser.kick(kReason);

    // send log entry
    incidentschannel.send({ embeds: [kickEmbed] });
};


module.exports.help = {
  name: "kick",
  permission: "MANAGE_MESSAGES",
  usage: "<@user> <reason>",
  description: "Kick a player from the discord."
}
