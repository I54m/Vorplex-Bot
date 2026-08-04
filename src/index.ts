import { Client, GatewayIntentBits, Events } from 'discord.js';
import 'dotenv/config';
import logger from './logger.js';

// Initialize client with necessary intents
const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Event: Client Ready
client.once(Events.ClientReady, (readyClient) => {
    logger.info(`🤖 Logged in successfully as ${readyClient.user.tag}!`);
});

// Event: Message Create (Basic ping-pong response)
client.on(Events.MessageCreate, async (message) => {
    // Prevent the bot from responding to itself
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!ping') {
        await message.reply('🏓 Pong!');
    }
});

// Login using the environment token
client.login(process.env.DISCORD_BOT_TOKEN);