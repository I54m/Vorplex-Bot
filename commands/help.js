const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {

    const helpEmbed = new EmbedBuilder()
        .setDescription(`Commands <@${message.member.id}> has permission to use`)
        .setColor(botconfig.embedColour)
        .addFields({
            name: "Key",
            value: "<> = required argument   [] = optional argument"
        });

    bot.commands.forEach((props) => {

        // permission "NONE" means everyone can use it
        if (props.help.permission === "NONE") {
            helpEmbed.addFields({
                name: `${botconfig.prefix}${props.help.name} ${props.help.usage}`,
                value: props.help.description
            });
            return;
        }

        // otherwise check if member has required permission
        if (message.member.permissions.has(PermissionsBitField.Flags[props.help.permission])) {
            helpEmbed.addFields({
                name: `${botconfig.prefix}${props.help.name} ${props.help.usage}`,
                value: props.help.description
            });
        }
    });

    return message.channel.send({ embeds: [helpEmbed] });
};

module.exports.help = {
    name: "help",
    permission: "NONE",
    usage: "",
    description: "View this help menu."
};