
import { Channel, ChannelType, Client, IntentsBitField, Message, Partials, TextChannel } from 'discord.js';

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
    console.log(`Alexyz Bot is ready!`);
});

const sinChannelId = '1078180531138744441';

client.on('messageCreate', (message: Message) => {
    if (message.author.bot || !message.content || !message.content.startsWith('!')) {
        return;
    }

    const [command, ...args] = message.content.slice(1).split(/\s+/);

    if (message.channel.type === ChannelType.DM) {
        if (command === 'confess') {
            client.channels.fetch(sinChannelId).then((channel: Channel | null) => {
                if (!channel) return;
                if (channel.type !== ChannelType.GuildText) return;
                
                channel.send(args.join(' '));
            })
        }
    }

    if (command === 'ping') {
        message.reply('Pong!');
    }
});

client.login(token);
