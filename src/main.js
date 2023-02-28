"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var pg_1 = require("pg");
var confession_1 = require("./commands/confession");
var game_1 = require("./commands/game");
var ping_1 = require("./commands/ping");
var postgresClient = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});
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
var token = process.env.DISCORD_BOT_TOKEN;
client.on('ready', function () {
    console.log("Bot is ready.");
});
client.on('messageCreate', function (message) {
    if (message.author.bot ||
        !message.content ||
        !message.content.startsWith('!')) {
        return;
    }
    var _a = message.content.slice(1).split(/\s+/), command = _a[0], args = _a.slice(1);
    switch (command) {
        case 'confess':
            (0, confession_1["default"])(message, args, client);
            break;
        case 'game':
            (0, game_1["default"])(message, args);
            break;
        case 'ping':
            (0, ping_1["default"])(message, args);
            break;
        default:
            break;
    }
});
client.login(token);
