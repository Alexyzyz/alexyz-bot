
import { Client, IntentsBitField, Message, Partials } from 'discord.js';
import { Client as PostgresClient } from 'pg';
import confess from './commands/confession';

import game from './commands/game';
import ping from './commands/ping';

const postgresClient = new PostgresClient({
    host: 'localhost',
    port: 5432,
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name',
})

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ],
});

const token = process.env.DISCORD_BOT_TOKEN;

client.on('ready', () => {
    console.log(`Bot is ready.`);
});

client.on('messageCreate', (message: Message) => {
    if (message.author.bot ||
        !message.content ||
        !message.content.startsWith('!')) {
        return;
    }

    const [command, ...args] = message.content.slice(1).split(/\s+/);

    switch (command) {
        case 'confess':
            confess(message, args, client);
            break;
        case 'game':
            game(message, args);
            break;
        case 'ping':
            ping(message, args);
            break;
        default:
            break;
    }

});

client.login(token);
