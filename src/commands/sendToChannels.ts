import { Message, TextChannel } from 'discord.js';
import { BotConfig } from '../config';

export default function sendToChannels(args: string[], msg: Message, botConfig: BotConfig): number {
    if (args.length <= 0) {
        msg.channel.send("Please enter a message that the bot should send into the channels");
        return;
    }

    if (!botConfig) {
        msg.channel.send("No bot Config found");
        return;
    }

    // TODO: Rewrite to be compatible with new config layout
    // config.channels.forEach(channelId => {
    //     const channel = msg.guild.channels.cache.get(channelId);
    //     if (channel && channel instanceof TextChannel) {
    //         channel.send(args.join(" ") + "\n `Author: " + msg.author.username + "`");
    //     } else {
    //         msg.channel.send("The Channel with the id: " + channelId + " was not found");
    //     }
    // });
}