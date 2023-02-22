
import { Client, IntentsBitField } from 'discord.js';

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages],
});

const token = 'MTA3Nzk4NjA0MDc3OTkwMzAwNg.GQFg5C.HeOxlCz9aB4ZG0j2uoDv22FfbnkvTrT2apt5ho';

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', (message) => {

    if (message.author.bot || !message.content || !message.content.startsWith('!')) {
        return;
    }

    const [command, ...args] = message.content.slice(1).split(/\s+/);

    if (command === 'ping') {
        message.reply('Pong!');
    }
});

client.login(token);
