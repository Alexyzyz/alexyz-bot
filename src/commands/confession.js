"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var sinChannelId = '1078180531138744441';
function confess(message, args, client) {
    if (message.channel.type !== discord_js_1.ChannelType.DM) {
        message.reply("Confess anonymously. Use this command in my DMs.");
        return;
    }
    client.channels.fetch(sinChannelId).then(function (channel) {
        if (!channel)
            return;
        if (channel.type !== discord_js_1.ChannelType.GuildText)
            return;
        if (args.length > 0) {
            channel.send(args.join(' '));
        }
        if (message.attachments.size > 0) {
            var images_message_1 = '**Confesser sent the following:**\n';
            message.attachments.forEach(function (attachment) {
                var _a;
                if ((_a = attachment.contentType) === null || _a === void 0 ? void 0 : _a.startsWith('image/')) {
                    images_message_1 += attachment.url + '\n';
                }
            });
            channel.send(images_message_1);
        }
    });
}
exports["default"] = confess;
