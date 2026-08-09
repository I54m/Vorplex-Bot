import { BOT_CLIENT, startBot } from './bot.js';
import { Events } from 'discord.js';

// Event: Message Create (Basic ping-pong response)
BOT_CLIENT.on(Events.MessageCreate, async (message) => {
    // Prevent the bot from responding to itself
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!ping') {
        await message.reply('🏓 Pong!');
    }
});

startBot();
