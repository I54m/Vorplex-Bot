const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let { body } = await superagent
        .get("https://cataas.com/cat?json=true");

    const catembed = new EmbedBuilder()
        .setColor(botconfig.embedColour)
        .setDescription("Cat :cat:")
        .setImage(body.url)
        .setFields({ name: "Source", value: `[cataas.com](${body.url})` },
          { name: "Requested by", value: `<@${message.author.id}>` },
          { name: "Tags", value: body.tags.length > 0 ? body.tags.join(", ") : "None" });

    return message.channel.send({ embeds: [catembed] });
};

module.exports.help = {
    name: "cat",
    permission: "NONE",
    usage: "",
    description: "Retrieve a picture of a cat."
};

