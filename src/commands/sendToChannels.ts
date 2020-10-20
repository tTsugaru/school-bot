import { Message, TextChannel } from 'discord.js';
import { Config, getConfig, updateConfig } from '../main';

export default function sendToChannels(args: string[], msg: Message): number {
    if (args.length <= 0) {
        msg.channel.send("Please enter a message that the bot should send into the channels");
        return;
    }

    const config = getConfig();
    if (!config) {
        msg.channel.send("No bot Config found");
        return;
    }

    config.channels.forEach(channelId => {
        const channel = msg.guild.channels.cache.get(channelId);
        if (channel && channel instanceof TextChannel) {
            channel.send(args.join(" ") + "\n `Author: " + msg.author.username + "`");
        } else {
            msg.channel.send("The Channel with the id: " + channelId + " was not found");
        }
    });
}