import { Message, MessageEmbed, TextChannel } from 'discord.js';
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

    let firstArg = args.shift()

    let generalChannels = botConfig.generalChannels;
    let channelGroups = botConfig.channelGroups;

    if (firstArg === "general") {
        generalChannels.forEach(channel => {
            let foundChannel = msg.guild.channels.cache.find(fc => fc.id === channel.id || fc.name === channel.name);
            if (typeof foundChannel === "undefined") {
                return 0;
            }

            if (foundChannel instanceof TextChannel) {
                sendMessage(foundChannel);
            }
        });
    } else {
        let foundChannelGroup = channelGroups.find(channelGroup => channelGroup.name === firstArg);
        if (typeof foundChannelGroup === "undefined") {
            msg.channel.send(`The channel group **${firstArg}** was not found.`);
            return 0;
        }

        if (foundChannelGroup.channels.length > 0) {
            foundChannelGroup.channels.forEach(channel => {
                let foundChannel = msg.guild.channels.cache.find(fc => fc.id === channel.id || fc.name === channel.name);
                if (typeof foundChannel === "undefined") {
                    return 0;
                }

                if (foundChannel instanceof TextChannel) {
                    sendMessage(foundChannel);
                }
            });
        }
    }

    function sendMessage(channelToSendTo: TextChannel) {
        let embededMessage = new MessageEmbed()
            .setTitle(`Message from ${msg.author.username}`)
            .setDescription(args.join(" "))
            .setColor("GOLD");

        channelToSendTo.send(embededMessage);
    }
}