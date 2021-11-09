import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { BotConfig, getConfig } from '../config';

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
            let foundChannel = msg.guild.channels.cache.find(fc => fc.id === channel.id);
            if (typeof foundChannel === "undefined") {
                return 0;
            }

            if (foundChannel instanceof TextChannel) {
                sendMessage(foundChannel, msg);
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
                let foundChannel = msg.guild.channels.cache.find(fc => fc.id === channel.id);
                if (typeof foundChannel === "undefined") {
                    return 0;
                }

                if (foundChannel instanceof TextChannel) {
                    sendMessage(foundChannel, msg);
                }
            });
        }
    }

    function sendMessage(channelToSendTo: TextChannel, msg: Message) {
        msg.attachments.forEach(test => {
            console.log(test.url);
        });
        let embededMessage = new MessageEmbed()

        if (msg.attachments.size > 0) {
            embededMessage
                .setDescription(args.join(" "))
                .setFooter(`From ${msg.author.username}`, msg.author.displayAvatarURL())
                .setImage(msg.attachments.first().url)
                .setColor("GOLD");
        } else {
            embededMessage
                .setDescription(args.join(" "))
                .setFooter(`From ${msg.author.username}`, msg.author.displayAvatarURL())
                .setColor("GOLD");
        }
        channelToSendTo.send(embededMessage);
    }
}
const config = getConfig();
export const sendDescription: string = `Sends a Text to the given group.\n
\n - \`send general <text>\` - Sends a text to all channel from the general group.
\n - \`send <groupname><text>\` - Sends a text to all channels from the given group.
`