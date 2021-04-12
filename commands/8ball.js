const botconfig = require("./../botconfig.json");
const messageconfig = require("./../messages.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args.length <= 1) return message.reply("Please specify a longer message!");
    let user = message.member;
    let question = args.join(" ");
    let embedColor = botconfig.embedColour;
    let choiceNumber = Math.floor(Math.random() * 3) + 1;
    let answerArray = [];
    if (choiceNumber == 1) {
        answerArray = messageconfig.answersyes;
    } else if (choiceNumber == 2) {
        answerArray = messageconfig.answersno;
    } else {
        answerArray = messageconfig.answersmaybe;
    }
    let answerNumber = Math.floor(Math.random() * answerArray.length);
    let answer = answerArray[answerNumber];
    let answerEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${user.id}> ${question}`)
        .setColor(embedColor)
        .addField(`Answer`, `${answer}`);
    message.channel.send(answerEmbed);
}

module.exports.help = {
    name: "8ball",
    permission: "NONE",
    usage: "<question>",
    description: "Ask the bot a simple question."
}
