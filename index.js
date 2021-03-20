const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const { exit } = require("process");
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <=0){
    console.log("Couldn't find commands!");
    return;
  }
  console.log("Loading command files....\n");
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })
})

fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <=0){
    console.log("Couldn't find events!");
    return;
  }
  console.log("\nLoading event files....\n");
  jsfile.forEach((f, i) =>{
    let props = require(`./events/${f}`);
    const event = require(`./events/${f}`);
    console.log(`${f} loaded!`);
    bot.on(props.help.name, props.run.bind(null, bot));
    delete require.cache[require.resolve(`./events/${f}`)];
  })
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.reply("Please do not private message me!!");

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
});

bot.login(botconfig.token).catch( () => {
    console.log(`Unable to login, token: ${botconfig.token} was rejected by discord auth servers!`);
    exit;
});