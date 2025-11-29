const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const suggestChannel = message.guild.channels.cache.find(ch => ch.name === botconfig.suggestionschannel);
    if (!suggestChannel) return message.channel.send(":x: Could not find the suggestions channel!");

    const suggest = args.join(" ");
    if (!suggest) return message.channel.send(`:x: Please use \`${botconfig.prefix}suggest <message>\``);

    const embed = new EmbedBuilder()
        .setTitle("Suggestion")
        .setAuthor({ name: `Left by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(suggest)
        .setTimestamp()
        .setColor(botconfig.embedColour)
        .setFooter({ text: `© ${message.guild.name}` });

    await message.delete().catch(() => {});
    await message.reply("Your suggestion has been placed!").then(msg => setTimeout(() => msg.delete(), 5000));

    const embedMessage = await suggestChannel.send({ embeds: [embed] });
    await embedMessage.react('👍');
    await embedMessage.react('👎');
};

module.exports.help = {
    name: "suggest",
    permission: "NONE",
    usage: "<message>",
    description: "Suggest something to be added to the server!"
};
