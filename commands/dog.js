const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let { body } = await superagent
        .get("https://random.dog/woof.json");

    const dogembed = new EmbedBuilder()
        .setColor(botconfig.embedColour)
        .setDescription("Doggo :dog:")
        .setImage(body.url)
        .addFields(
          { name: "Source", value: `[random.dog](${body.url})` },
          { name: "Requested by", value: `<@${message.author.id}>` }
        );

    return message.channel.send({ embeds: [dogembed] });
};

module.exports.help = {
    name: "dog",
    permission: "NONE",
    usage: "",
    description: "Retrieve a picture of a dog."
};
