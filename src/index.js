"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildEmojisAndStickers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.GuildMessageReactions,
        discord_js_1.IntentsBitField.Flags.DirectMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent
    ],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message
    ]
});
var token = 'MTA3Nzk4NjA0MDc3OTkwMzAwNg.Gkl44m.CNycGUQOJ--6OPtCv3ELZa_1MyKqjWeCfuCSyE';
client.on('ready', function () {
    var _a;
    console.log("Logged in as ".concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag, "!"));
});
var sinChannelId = '1078180531138744441';
client.on('messageCreate', function (message) {
    if (message.author.bot || !message.content || !message.content.startsWith('!')) {
        return;
    }
    var _a = message.content.slice(1).split(/\s+/), command = _a[0], args = _a.slice(1);
    if (message.channel.type === discord_js_1.ChannelType.DM) {
        if (command === 'confess') {
            client.channels.fetch(sinChannelId).then(function (channel) {
                if (!channel)
                    return;
                if (channel.type !== discord_js_1.ChannelType.GuildText)
                    return;
                channel.send(args.join(' '));
            });
        }
    }
    if (command === 'ping') {
        message.reply('Pong!');
    }
});
client.login(token);
