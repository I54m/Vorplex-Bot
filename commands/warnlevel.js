const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    const wUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!wUser) return message.reply("Couldn't find that user!");

    if (!warns[wUser.id] || !warns[wUser.id].warns)
        return message.reply(`<@${wUser.id}> has no warnings!`);

    const warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> has ${warnlevel} warning${warnlevel === 1 ? "" : "s"}.`);
};

module.exports.help = {
    name: "warnlevel",
    permission: "NONE",
    usage: "<@user>",
    description: "View how many warnings a user has."
};
