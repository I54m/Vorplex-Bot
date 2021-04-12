const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) =>{

  let {body} = await superagent
  .get("https://aws.random.cat/meow");

  let catembed = new Discord.MessageEmbed()
  .setColor(botconfig.embedColour)
  .setDescription("Cat :cat:")
  .setImage(body.file);

  message.channel.send(catembed)

}

module.exports.help = {
  name: "cat",
  permission: "NONE",
  usage: "",
  description: "Retrieve a picture of a cat."
}
