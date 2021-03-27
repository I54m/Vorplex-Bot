const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const messagelist = require("./../messages.json");

module.exports.run = async (bot, member) => {
    if (!botconfig.joinrole) return console.log("Unable to find join role in config!");
    let joinrole = member.guild.roles.find(`name`, botconfig.joinrole);
    if (!joinrole) return console.log("Unable to find join role!");
    await (member.addRole(joinrole.id));

    let welcomechannel = member.guild.channels.find(`name`, botconfig.welcomechannel);
    if (!welcomechannel) return console.log("Unable to find welcome channel!");
    let embedColour = botconfig.embedColour;
    let messageArray = messagelist.welcomemessages;
    let messageNumber = Math.floor(Math.random() * messageArray.length);
    let message = messageArray[messageNumber];
    if (message.includes("{number}")) {
        let number = Math.floor(Math.random() * 3678);
        message = message.replace(`{number}`, `${number}`);
    }
    let welcomeEmbed = new Discord.RichEmbed()
        .setTitle(`**Welcome ${member.displayName} to the Vorplex Server Discord!**`)
        .setColor(`${embedColour}`)
        .setDescription(message.replace(`{user}`, `${member.user.tag}`));
    if (member.guild.channels.find(`name`, botconfig.rulesinfochannel))
        welcomeEmbed.addField("Rules & Info", `${member.guild.channels.find(`name`, botconfig.rulesinfochannel).toString()}`, true);
    welcomeEmbed
        .addField("Store", "https://store.vorplex.net", true)
        .addField("IP", "mc.vorplex.net", true)
        .addField("MC Version", "1.8+", true)
        .setThumbnail("https://api.i54m.com/Vorplex/Vorplex-Server-Icon-x1000.png")
        .setFooter(`Total: ${member.guild.memberCount} members`);
    welcomechannel.send(welcomeEmbed);
}

module.exports.help = {
    name: "guildMemberAdd"
}
