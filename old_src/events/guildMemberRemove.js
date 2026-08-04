const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");
const messagelist = require("./../messages.json");

module.exports.run = async (bot, member) => {
    // Get leave channel
    const leaveChannel = member.guild.channels.cache.find(ch => ch.name === botconfig.leavechannel);
    if (!leaveChannel) return;

    let bicon = bot.user.displayAvatarURL();

    // Select a random goodbye message
    const messageArray = messagelist.goodbyemessages;
    let message = messageArray[Math.floor(Math.random() * messageArray.length)];
    if (message.includes("{number}")) {
        const number = Math.floor(Math.random() * 3678);
        message = message.replace("{number}", `${number}`);
    }
    message = message.replace("{user}", `${member.user.tag}`);

    // Build embed
    const goodbyeEmbed = new EmbedBuilder()
        .setTitle(`Goodbye ${member.displayName}!`)
        .setColor(botconfig.embedColour)
        .setDescription(message)
        .setThumbnail(bicon)
        .setFooter({ text: `Total: ${member.guild.memberCount} members` });

    // Send embed
    await leaveChannel.send({ embeds: [goodbyeEmbed] }).catch(console.error);
};

module.exports.help = {
    name: "guildMemberRemove"
};
