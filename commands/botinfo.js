const { EmbedBuilder } = require("discord.js");
const botconfig = require("./../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let embedColour = botconfig.embedColour;

  let bicon = bot.user.displayAvatarURL();

  const botembed = new EmbedBuilder()
    .setDescription("Bot Information")
    .setColor(embedColour)
    .setThumbnail(bicon)
    .addFields(
      { name: "Bot Name", value: bot.user.username },
      { name: "Created On", value: bot.user.createdAt.toDateString() },
      { name: "Revived On", value: "Sat Nov 29 2025" },
      { name: "Developer", value: "I54m" }
    );

  return message.channel.send({ embeds: [botembed] });
}

module.exports.help = {
  name: "botinfo",
  permission: "NONE",
  usage: "",
  description: "View simple information about the bot."
};
