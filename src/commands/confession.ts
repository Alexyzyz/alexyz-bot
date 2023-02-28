import { Channel, ChannelType, Client, Message } from "discord.js";

const sinChannelId = '1078180531138744441';

export default function confess(message: Message, args: string[], client: Client) {
    if (message.channel.type !== ChannelType.DM) {
        message.reply("Confess anonymously. Use this command in my DMs.");
        return;
    }

    client.channels.fetch(sinChannelId).then((channel: Channel | null) => {
        if (!channel) return;
        if (channel.type !== ChannelType.GuildText) return;
        
        channel.send(args.join(' '));

        if (message.attachments.size > 0) {
            let images_message = '';
            message.attachments.forEach((attachment) => {
                if (attachment.contentType?.startsWith('image/')) {
                    images_message += attachment.url;
                }
            });
            channel.send(images_message);
        }
    });

}