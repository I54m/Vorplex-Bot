const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        return message.reply("Sorry, you can't do that!");

    const tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!tomute) return message.reply("Couldn't find user!");
    if (tomute.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        return message.reply("Can't mute them!");

    // Find or create Muted role
    let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muterole) {
        try {
            muterole = await message.guild.roles.create({
                name: "Muted",
                color: "#131313",
                permissions: []
            });

            // Update channel permissions
            message.guild.channels.cache.forEach(async (channel) => {
                await channel.permissionOverwrites.edit(muterole, {
                    SendMessages: false,
                    AddReactions: false,
                    Speak: false,
                    SendTTSMessages: false,
                    ManageMessages: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    // Parse duration
    const duration = args[1];
    if (!duration) return message.reply("Please specify a mute duration!");
    const expire = Date.now() + ms(duration);

    // Reason
    args.shift(); // remove user
    args.shift(); // remove time
    let reason = args.join(" ") || "Manually Muted!";

    // Add role
    await member.roles.add(muteRole).catch(console.error);

     // Save mute to JSON
    const mutes = JSON.parse(fs.readFileSync("./mutes.json", "utf8"));
    mutes[member.id] = {
        guildId: message.guild.id,
        expire
    };
    fs.writeFileSync("./mutes.json", JSON.stringify(mutes, null, 2));

    // Log embed
    const muteEmbed = new EmbedBuilder()
        .setDescription("Mute")
        .setColor("#f44a11")
        .addFields(
            { name: "Muted User", value: `${tomute} (ID: ${tomute.id})` },
            { name: "Muted By", value: `<@${message.author.id}> (ID: ${message.author.id})` },
            { name: "Muted in", value: `${message.channel}` },
            { name: "Time", value: `${message.createdAt}` },
            { name: "Duration", value: ms(ms(mutetime)) },
            { name: "Reason", value: reason }
        );

    const incidentschannel = message.guild.channels.cache.find(ch => ch.name === botconfig.incidentschannel);
    if (!incidentschannel) return message.channel.send("Couldn't find incidents channel!");

    message.delete().catch(() => {});
    incidentschannel.send({ embeds: [muteEmbed] });
};


module.exports.help = {
  name: "tempmute",
  permission: "MANAGE_MESSAGES",
  usage: "<@user> <reason>",
  description: "Mute a player from speaking in the discord."
}
