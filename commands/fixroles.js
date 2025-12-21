const { PermissionsBitField } = require("discord.js");
const botconfig = require("./../botconfig.json");

let inprogress = false;

module.exports.run = async (bot, message, args) => {
    if (inprogress)
        return message.reply("Already processing the previous fixroles, this could take up to 30 minutes. Please try again later!");

    if (!botconfig.joinrole)
        return message.reply("Unable to find join role in config!");

    const joinRole = message.guild.roles.cache.find(r => r.name === botconfig.joinrole);
    if (!joinRole) return message.reply("Unable to find join role!");

    if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles))
        return message.reply("I don't have permission to manage roles!");

    if (joinRole.position >= message.guild.members.me.roles.highest.position) {
       return message.reply("Join role is higher than my highest role!");
    }
    
    inprogress = true;
    message.reply("Processing now, this may take a while for large servers...");



    await message.guild.members.fetch();

    for (const member of message.guild.members.cache.values()) {
        if (!member.roles.cache.has(joinRole.id)) {
            await member.roles.add(joinRole).catch(console.error);
        }
    }

    inprogress = false;
    message.channel.send("Finished applying join role to all members!");
};

module.exports.help = {
    name: "fixroles",
    permission: "ADMINISTRATOR",
    usage: "",
    description: "Give everyone the member role if the welcome role is not functioning."
};

