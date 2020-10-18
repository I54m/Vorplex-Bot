const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
let advertisers = JSON.parse(fs.readFileSync("./advertisers.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    return message.reply("Command is not yet ready for use!");
    /*
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry, you can't do that!");
    let advertiser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!advertiser) return message.reply("couldn't find user!");
    let advertiserRole = message.guild.roles.find(`name`, args[1] + " Advertiser");
    let package = args[1].toLowerCase();
    if(!advertiserRole) return message.reply("No such advertiser role as: " + args[1] + " Advertiser!")
    await(advertiser.addRole(advertiserRole.id));
    let advertiserTime = args[2];
    if(!advertiserTime) return message.reply("No time specified!");
    var matches = advertiserTime.match(/\d+/g);
    if (matches == null) return message.reply(`${advertiserTime} is not a valid time!`);

    let AdvertEmbed = new Discord.RichEmbed()
    .setDescription("**Advertiser Added**")
    .setColor(`${botconfig.embedColour}`)
    .addField("Advertiser added", `${advertiser} with ID ${advertiser.id}`)
    .addField("Given By", `<@${message.author.id}> with Id ${message.author.id}`)
    .addField("Time", message.createdAt)
    .addField("Advertiser Type", args[1])
    .addField("Duration", ms(ms(advertiserTime)));

    let loggingchannel = message.guild.channels.find(`name`, botconfig.loggingchannel);
    if(!loggingchannel) return message.channel.send("Couldn't find Logging channel!");
    message.delete().catch(O_o=>{});
    loggingchannel.send(AdvertEmbed);

    if(!advertisers[advertiser.id]) advertisers[advertiser.id] = {
        instagram: 0,
        minecraft: 0,
        youtube: 0,
        discord: 0,
        nsfw: 0,
        miscellaneous: 0
      };

    switch(package){
        case "instagram": {
            advertisers[advertiser.id].instagram = advertiserTime;
            break;
        }
        case "minecraft": {
            advertisers[advertiser.id].minecraft = advertiserTime;
            break;
        }
        case "youtube": {
            advertisers[advertiser.id].youtube = advertiserTime;
            break;
        }
        case "discord": {
            advertisers[advertiser.id].discord = advertiserTime;
            break;
        }
        case "nsfw": {
            advertisers[advertiser.id].nsfw = advertiserTime;
            break;
        }
        case "miscellaneous": {
            advertisers[advertiser.id].miscellaneous = advertiserTime;
            break;
        }
    }
    fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
        if (err) console.log(err)
      });

    setTimeout(async function(){
        let advertiserUser = advertiser.user;
        advertiser.removeRole(advertiserRole.id);
        let dm = await(advertiserUser.createDM());
        dm.send(`Your ${package} advertisement package has expired!`);
        dm.delete();
        switch(package){
            case "instagram": {
                advertisers[advertiser.id].instagram = 0;
                break;
            }
            case "minecraft": {
                advertisers[advertiser.id].minecraft = 0;
                break;
            }
            case "youtube": {
                advertisers[advertiser.id].youtube = 0;
                break;
            }
            case "discord": {
                advertisers[advertiser.id].discord = 0;
                break;
            }
            case "nsfw": {
                advertisers[advertiser.id].nsfw = 0;
                break;
            }
            case "miscellaneous": {
                advertisers[advertiser.id].miscellaneous = 0;
                break;
            }
        }
        fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
            if (err) console.log(err)
          });
    }, ms(advertiserTime));
    */
}

module.exports.help = {
  name: "advertiser",
  permission: "ADMINISTRATOR",
  usage: "",
  //usage: "<@user> <advertiser type> <duration>",
  description: "Command not yet implemented!"
  //description: "Give someone an advertiser role for a duration of time."
}
