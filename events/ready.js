const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const ms = require("ms");
const fs = require("fs");
//let advertisers = JSON.parse(fs.readFileSync("./advertisers.json", "utf8"));

module.exports.run = async (bot) => {
    console.log(`${bot.user.username} is online!`);
    let statuses = botconfig.statuses;
    let guild = bot.guilds.get(`${botconfig.guildid}`);
    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(`${status}`, { type: "PLAYING" });
    }, 10000);
    /*
    Object.keys(advertisers).forEach((key, index, array) =>{
        let advertiserUser = bot.fetchUser(key);
        let advertiser = guild.fetchMember(advertiserUser);
        if (advertisers[advertiser.id].instagram != 0)
            setTimeout(async function(){
                let advertiserRole = guild.roles.find(`name`, "Instagram Advertiser");
                advertiser.removeRole(advertiserRole.id);
                let dm = await(advertiserUser.createDM());
                dm.send(`Your instagram advertisement package has expired!`);
                dm.delete();
                advertisers[advertiser.id].instagram = 0;
                fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
                    if (err) console.log(err)
                  });
            }, ms(advertisers[advertiser.id].instagram));

        if (advertisers[advertiser.id].minecraft != 0)
            setTimeout(async function(){
                let advertiserRole = guild.roles.find(`name`, "Minecraft Advertiser");
                advertiser.removeRole(advertiserRole.id);
                let dm = await(advertiserUser.createDM());
                dm.send(`Your minecraft advertisement package has expired!`);
                dm.delete();
                advertisers[advertiser.id].minecraft = 0;
                fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
                    if (err) console.log(err)
                  });
            }, ms(advertisers[advertiser.id].minecraft));

        if (advertisers[advertiser.id].youtube != 0)
            setTimeout(async function(){
                let advertiserRole = guild.roles.find(`name`, "YouTube Advertiser");
                advertiser.removeRole(advertiserRole.id);
                let dm = await(advertiserUser.createDM());
                dm.send(`Your youtube advertisement package has expired!`);
                dm.delete();
                advertisers[advertiser.id].youtube = 0;
                fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
                    if (err) console.log(err)
                  });
            }, ms(advertisers[advertiser.id].youtube));

        if (advertisers[advertiser.id].discord != 0)
            setTimeout(async function(){
                let advertiserRole = guild.roles.find(`name`, "Discord Advertiser");
                advertiser.removeRole(advertiserRole.id);
                let dm = await(advertiserUser.createDM());
                dm.send(`Your discord advertisement package has expired!`);
                dm.delete();
                advertisers[advertiser.id].discord = 0;
                fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
                    if (err) console.log(err)
                  });
            }, ms(advertisers[advertiser.id].discord));

        if (advertisers[advertiser.id].nsfw != 0)
            setTimeout(async function(){
                let advertiserRole = guild.roles.find(`name`, "NSFW Advertiser");
                advertiser.removeRole(advertiserRole.id);
                let dm = await(advertiserUser.createDM());
                dm.send(`Your nsfw advertisement package has expired!`);
                dm.delete();
                advertisers[advertiser.id].nsfw = 0;
                fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
                    if (err) console.log(err)
                  });
            }, ms(advertisers[advertiser.id].nsfw));
        
        if (advertisers[advertiser.id].miscellaneous != 0)
            setTimeout(async function(){
                let advertiserRole = guild.roles.find(`name`, "Miscellaneous Advertiser");
                advertiser.removeRole(advertiserRole.id);
                let dm = await(advertiserUser.createDM());
                dm.send(`Your miscellaneous advertisement package has expired!`);
                dm.delete();
                advertisers[advertiser.id].miscellaneous = 0;
                fs.writeFile("./advertisers.json", JSON.stringify(advertisers), (err) => {
                    if (err) console.log(err)
                  });
            }, ms(advertisers[advertiser.id].miscellaneous));
    });*/
}

module.exports.help = {
    name: "ready"
}
