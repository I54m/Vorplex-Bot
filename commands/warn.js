const botconfig = require("./../botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that!");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!wUser) return message.reply("Couldn't find that user!");
    if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't warn them!");
    let reason = args.join(" ").slice(22);

    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
    let furtherAction = "None";
    if (warns[wUser.id].warns == 3) {
        let muterole = message.guild.roles.find(`name`, "Muted");
        if (!muterole) return messge.reply("Mute role does not exsist mute someone for me to auto create and setup the role for you!");
        furtherAction = "15m Mute";
        let mutetime = "15m";
        await (wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}> has been temporarily muted!`);
        setTimeout(function () {
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}> has been unmuted!`);
        }, ms(mutetime));
    } else if (warns[wUser.id].warns == 4) {
        message.guild.member(wUser).kick("You exceeded 3 warnings!");
        message.channel.send(`<@${wUser.id}> has been kicked for exceeding 3 warnings!`);
        furtherAction = "Kicked";
    } else if (warns[wUser.id].warns == 5) {
        message.guild.member(wUser).ban("You exceeded 5 warnings!");
        message.channel.send(`<@${wUser.id}> has been banned for exceeding 5 warnings!`);
        furtherAction = "Banned";
    }
    message.reply(`You have been warned for: ${reason} you now have ${warns[wUser.id].warns} warnings!`);
    let warnEmbed = new Discord.RichEmbed()
        .setDescription("~~Warn~~")
        .setColor("#e5de16")
        .addField("Warned User", `<@${wUser.id}> with ID ${wUser.id}`)
        .addField("Warned By", `<@${message.author.id}> with Id ${message.author.id}`)
        .addField("Warned In", message.channel)
        .addField("Number of Warnings", warns[wUser.id].warns)
        .addField("Reason", reason)
        .addField("Further Action", furtherAction);

    let incidentschannel = message.guild.channels.find(`name`, botconfig.incidentschannel);
    if (!incidentschannel) return message.reply("Couldn't find incidents channel!");
    message.delete().catch(O_o => { });
    incidentschannel.send(warnEmbed);
}

module.exports.help = {
    name: "warn",
    permission: "MANAGE_MESSAGES",
    usage: "<@user> <reason>",
    description: "Warn a player for beaking the rules."
}
