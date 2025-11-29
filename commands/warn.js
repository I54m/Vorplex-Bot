const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");
const fs = require("fs");
const ms = require("ms");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMembers))
        return message.reply("You can't do that!");

    const wUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!wUser) return message.reply("Couldn't find that user!");
    if (wUser.permissions.has(PermissionsBitField.Flags.ManageMessages))
        return message.reply("You can't warn them!");

    // Extract reason
    args.shift(); // remove user
    const reason = args.join(" ") || "No reason provided";

    if (!warns[wUser.id]) warns[wUser.id] = { warns: 0 };
    warns[wUser.id].warns++;

    fs.writeFileSync("./warnings.json", JSON.stringify(warns, null, 2));

    let furtherAction = "None";

    if (warns[wUser.id].warns === 3) {
        let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!muterole) return message.reply("Mute role does not exist! Create one or use tempmute to auto-create it.");

        furtherAction = "15m Mute";
        const expire = Date.now() + ms("15m");
        await wUser.roles.add(muteRole).catch(console.error);

        const mutes = JSON.parse(fs.readFileSync("./mutes.json", "utf8"));
        mutes[wUser.id] = {
            guildId: message.guild.id,
            expire
        };
        fs.writeFileSync("./mutes.json", JSON.stringify(mutes, null, 2));

        furtherAction = "15m Temp Mute";
        message.channel.send(`<@${wUser.id}> has been temporarily muted for 15 minutes due to 3 warnings!`);

    } else if (warns[wUser.id].warns === 4) {
        await wUser.kick("You exceeded 3 warnings!");
        message.channel.send(`<@${wUser.id}> has been kicked for exceeding 3 warnings!`);
        furtherAction = "Kicked";

    } else if (warns[wUser.id].warns === 5) {
        await wUser.ban({ reason: "You exceeded 5 warnings!" });
        message.channel.send(`<@${wUser.id}> has been banned for exceeding 5 warnings!`);
        furtherAction = "Banned";
    }

    message.reply(`You have been warned for: ${reason}. You now have ${warns[wUser.id].warns} warnings!`);

    const warnEmbed = new EmbedBuilder()
        .setDescription("Warn")
        .setColor("#e5de16")
        .addFields(
            { name: "Warned User", value: `<@${wUser.id}> (ID: ${wUser.id})` },
            { name: "Warned By", value: `<@${message.author.id}> (ID: ${message.author.id})` },
            { name: "Warned In", value: `${message.channel}` },
            { name: "Number of Warnings", value: `${warns[wUser.id].warns}` },
            { name: "Reason", value: reason },
            { name: "Further Action", value: furtherAction }
        );

    const incidentschannel = message.guild.channels.cache.find(ch => ch.name === botconfig.incidentschannel);
    if (!incidentschannel) return message.reply("Couldn't find incidents channel!");

    message.delete().catch(() => {});
    incidentschannel.send({ embeds: [warnEmbed] });
};


module.exports.help = {
  name: "warn",
  permission: "MANAGE_MEMBERS",
  usage: "<@user> <reason>",
  description: "Warn a player for beaking the rules."
}
