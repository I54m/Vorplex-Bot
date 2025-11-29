const { ActivityType } = require('discord.js');
const botconfig = require("./../botconfig.json");
const fs = require("fs");

module.exports.run = async (bot) => {
    console.log(`${bot.user.username} is online!`);

    // Process temporary mutes and set interval to check every minute for expired mutes
    await processMutes(bot);

    // Run periodically every minute
    setInterval(() => processMutes(bot), 60_000);

    // Set random status
    await setRandomStatus(bot);
    setInterval(() => setRandomStatus(bot), 10000);
}

module.exports.help = {
  name: "clientReady"
}

async function setRandomStatus(bot) {
    let statuses = botconfig.statuses;
    let status = statuses[Math.floor(Math.random() * statuses.length)]
    try {
        await bot.user.setActivity(status, { type: ActivityType.Listening });
    } catch (err) {
        console.error("Failed to set status:", err);
    }
}

async function processMutes(bot) {
    let mutes = JSON.parse(fs.readFileSync("./mutes.json", "utf8"));
    const now = Date.now();

    for (const userId in mutes) {
        const muteData = mutes[userId];
        const guild = bot.guilds.cache.get(muteData.guildId);
        if (!guild) continue;

        const member = guild.members.cache.get(userId);
        if (!member) continue;

        if (now >= muteData.expire) {
            // Mute has expired
            const mutedRole = guild.roles.cache.find(r => r.name === "Muted");
            if (mutedRole && member.roles.cache.has(mutedRole.id)) {
                await member.roles.remove(mutedRole).catch(console.error);
            }
            delete mutes[userId];
        }
    }

    fs.writeFileSync("./mutes.json", JSON.stringify(mutes, null, 2));
}