const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");
const messageconfig = require("./../messages.json");

module.exports.run = async (bot, message, args) => {
    if (args.length <= 1)
        return message.reply("Please specify a longer message!");

    let user = message.member;
    let question = args.join(" ");
    let embedColor = botconfig.embedColour;

    // pick yes/no/maybe category
    let choiceNumber = Math.floor(Math.random() * 3) + 1;
    let answerArray = choiceNumber === 1 ? messageconfig.answersyes
        : choiceNumber === 2 ? messageconfig.answersno
        : messageconfig.answersmaybe;

    // pick actual answer
    let answerNumber = Math.floor(Math.random() * answerArray.length);
    let answer = answerArray[answerNumber];
    const answerEmbed = new EmbedBuilder()
        .setDescription(`<@${user.id}> ${question}`)
        .setColor(embedColor)
        .addFields({ name: "Answer", value: answer });

    return message.channel.send({ embeds: [answerEmbed] });
};

module.exports.help = {
    name: "8ball",
    permission: "NONE",
    usage: "<question>",
    description: "Ask the bot a simple question."
};
