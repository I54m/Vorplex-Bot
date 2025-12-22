const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");
const messagelist = require("./../messages.json");

module.exports.run = async (bot, member) => {
    // Assign join role
    if (!botconfig.joinrole) return console.log("Unable to find join role in config!");
    const joinRole = member.guild.roles.cache.find(r => r.name === botconfig.joinrole);
    if (!joinRole) return console.log("Unable to find join role!");
    await member.roles.add(joinRole).catch(console.error);

    let bicon = bot.user.displayAvatarURL();

    // Get welcome channel
    const welcomeChannel = member.guild.channels.cache.find(ch => ch.name === botconfig.welcomechannel);
    if (!welcomeChannel) return console.log("Unable to find welcome channel!");

    // Choose random welcome message
    const messageArray = messagelist.welcomemessages;
    let message = messageArray[Math.floor(Math.random() * messageArray.length)];
    if (message.includes("{number}")) {
        const number = Math.floor(Math.random() * 3678);
        message = message.replace("{number}", `${number}`);
    }
    message = message.replace("{user}", `${member.user.tag}`);

    // Build embed
    const welcomeEmbed = new EmbedBuilder()
        .setTitle(`Welcome ${member.displayName} to the Vorplex Discord Server!`)
        .setColor(botconfig.embedColour)
        .setDescription(message)
        .setThumbnail(bicon)
        .setFooter({ text: `Total: ${member.guild.memberCount} members` })
        .addFields(
            member.guild.channels.cache.find(ch => ch.name === botconfig.rulesinfochannel)
                ? { name: "Rules & Info", value: `<#${member.guild.channels.cache.find(ch => ch.name === botconfig.rulesinfochannel).id}>`, inline: true }
                : { name: "\u200B", value: "\u200B" },
            { name: "Store", value: "https://store.vorplex.net", inline: true },
            { name: "IP", value: "mc.vorplex.net", inline: true },
            { name: "MC Version", value: "1.20+", inline: true }
        );

    // Send embed
    await welcomeChannel.send({ embeds: [welcomeEmbed] }).catch(console.error);
};

module.exports.help = {
    name: "guildMemberAdd"
};
