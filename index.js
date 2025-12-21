const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials, ChannelType } = require("discord.js");
const fs = require("fs");
const { exit, release } = require("process");
require('dotenv').config();
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,            // allows joining servers
        GatewayIntentBits.GuildMessages,     // allows reading messages in guilds
        GatewayIntentBits.MessageContent     // required to read message.content
    ],
    partials: [Partials.Channel]             // optional but safe for your DM checks
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down cleanly...");
    try {
        await bot.destroy();
    } finally {
        process.exit(0);
    }
});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands!");
        return;
    }
    console.log("Loading command files....\n");
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})

fs.readdir("./events/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find events!");
        return;
    }
    console.log("\nLoading event files....\n");
    jsfile.forEach((f, i) => {
        let props = require(`./events/${f}`);
        console.log(`${f} loaded!`);
        bot.on(props.help.name, props.run.bind(null, bot));
        delete require.cache[require.resolve(`./events/${f}`)];
    })
})

bot.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM){
        await message.reply("Please do not private message me!!");
        return;
    }

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (!cmd.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
});

bot.login(process.env.DISCORD_BOT_TOKEN);