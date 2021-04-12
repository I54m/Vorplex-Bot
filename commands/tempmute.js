const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, you can't do that!");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("couldn't find user!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#131313",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) =>{
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false,
          SEND_TTS_MESSAGES: false,
          MANAGE_MESSAGES: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
    let mutetime = args[1];
    if(!mutetime) return message.reply("No time specified!");
    var matches = mutetime.match(/\d+/g);
    if (matches == null) return message.reply(`${mutetime} is not a valid time!`);
    args.shift();
    args.shift();
    let reason = args.join(" ");
    if (!reason) reason = "Manually Muted!";
    await(tomute.addRole(muterole.id));
    let muteEmbed = new Discord.MessageEmbed()
    .setDescription("~~Mute~~")
    .setColor("#f44a11")
    .addField("Muted User", `${tomute} with ID ${tomute.id}`)
    .addField("Muted By", `<@${message.author.id}> with Id ${message.author.id}`)
    .addField("Muted in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Duration", ms(ms(mutetime)))
    .addField("Reason", reason);
    let incidentschannel = message.guild.channels.find(`name`, botconfig.incidentschannel);
    if(!incidentschannel) return message.channel.send("Couldn't find incidents channel!");
    message.delete().catch(O_o=>{});
    incidentschannel.send(muteEmbed);

    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> your mute has expired!`);
    }, ms(mutetime));
  }

module.exports.help = {
  name: "tempmute",
  permission: "MANAGE_MESSAGES",
  usage: "<@user> <reason>",
  description: "Mute a player from speaking in the discord."
}
