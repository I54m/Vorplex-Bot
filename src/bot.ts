import { Client, GatewayIntentBits, Events, DiscordjsError } from 'discord.js';
import 'dotenv/config';
import logger from './logger.js';

// Initialize client with necessary intents
const BOT_CLIENT: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
});

// Event: Client Ready
BOT_CLIENT.once(Events.ClientReady, (readyClient) => {
    logger.info('');
    logger.info(`Successfully logged in as ${readyClient.user.tag}!`);
    logger.info('');
});

function startBot(): void {
    if (BOT_CLIENT.isReady()) {
        logger.error('Tried to start bot while bot is ready');
        return;
    }
    logger.info('Starting bot...');
    // Login using the environment token
    BOT_CLIENT.login(process.env.DISCORD_BOT_TOKEN).catch((err: unknown) => {
        if (err instanceof DiscordjsError) {
            if (err.code == 'TokenMissing') {
                logger.error('Bot token was not provided (check .env file)!');
                logger.error(err);
            } else if (err.code == 'TokenInvalid') {
                logger.error(
                    'Provided bot token was Invalid (check .env file)!',
                );
                logger.error(err);
            } else throw err;
        } else throw err;
    });
}

export { BOT_CLIENT, startBot };
