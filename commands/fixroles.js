const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");

let inprogress = false;

module.exports.run = async (bot, message, args) => {
    if (inprogress) return message.reply("Already processing the previous fixroles, this could take up to 30 minutes. Please try again later!")
    if (!botconfig.joinrole) return message.reply("Unable to find join role in config!");
    let joinrole = message.guild.roles.find(`name`, botconfig.joinrole);
    if (!joinrole) return message.reply("Unable to find join role!");
    async () => {
        message.guild.members.cache.forEach(member => member.roles.add(joinrole));
        inprogress = false;
    };
    message.reply("Processing now, please allow up to 30 minutes to process this command!");
    inprogress = true;
}

module.exports.help = {
  name: "fixroles",
  permission: "ADMINISTRATOR",
  usage: "",
  description: "Give everyone the member role if the welcome role is not functioning."
}
