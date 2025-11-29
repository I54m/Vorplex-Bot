const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.MANAGE_MESSAGES))
        return message.reply("Sorry you can't do that!");

    if (!args[0]) 
        return message.reply(`You need to specify an amount of messages to clear: ${botconfig.prefix}clear <number of messages> [user]`);

    if (isNaN(args[0])) 
        return message.reply(`${args[0]} is not a number of messages!`);

    let amount = parseInt(args[0]);
    if (amount > 99) amount = 99; // Discord limits bulkDelete to 100 messages

    const incidentschannel = message.guild.channels.cache.find(ch => ch.name === botconfig.incidentschannel);
    if (!incidentschannel) return message.channel.send("Couldn't find incidents channel!");

    const channelcleared = message.channel;
    const clearer = message.member;
    let user = "all";

    if (!args[1]) {
        // Clear messages without user filter
        await message.channel.bulkDelete(amount + 1, true)
            .catch(err => message.channel.send(`ERROR: ${err}`));
        message.channel.send(`Cleared ${amount} messages.`)
            .then(msg => setTimeout(() => msg.delete(), 5000));
    } else {
        // Clear messages from a specific user
        const toclear = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!toclear) return message.reply("Couldn't find user!");

        const fetched = await message.channel.messages.fetch({ limit: amount + 1 });
        const messagestoclear = fetched.filter(msg => msg.author.id === toclear.id);
        await message.channel.bulkDelete(messagestoclear, true)
            .catch(err => message.channel.send(`ERROR: ${err}`));
        message.channel.send(`Cleared ${messagestoclear.size} messages.`)
            .then(msg => setTimeout(() => msg.delete(), 5000));

        user = `<@${toclear.id}>`;
    }

    const clearEmbed = new EmbedBuilder()
        .setDescription("Clear")
        .setColor("#e5de16")
        .addFields(
            { name: "Channel Cleared", value: `${channelcleared}` },
            { name: "Cleared By", value: `<@${clearer.id}>` },
            { name: "Amount Cleared", value: `${amount}` },
            { name: "User Cleared", value: user }
        );

    incidentschannel.send({ embeds: [clearEmbed] });
};


module.exports.help = {
  name: "clear",
  permission: "MANAGE_MESSAGES",
  usage: "<amount> [@user]",
  description: "Clear a certain amount of message in a channel or by user in the channel."
}
