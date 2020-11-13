import { Message } from 'discord.js';
import { type } from 'os';
import { BotConfig, Channel, ChannelGroup, getBotConfig, updateBotConfig } from '../config';

export default function addChannels(args: string[], msg: Message, botConfig: BotConfig): number {
    if (args.length <= 0) {
        msg.channel.send("Please specify a channel/group to add");
        return;
    }

    if (!botConfig) {
        msg.channel.send("No bot Config found");
        return;
    }

    let configChannelGroups = botConfig.channelGroups

    // TODO: Fix duplicated channels in group
    if (args[0] !== "general" && args.length > 1) {
        let groupName = args.shift();

        if (configChannelGroups.length == 0) {
            addChannelsToNewGroup(groupName);
        } else {
            let foundChannelGroup = configChannelGroups.find(channelGroup => channelGroup.name === groupName);
            if (typeof foundChannelGroup === "undefined") {
                addChannelsToNewGroup(groupName);
            } else {
                args.forEach(channel => {
                    let foundChannel = findChannelInGroup(channel, foundChannelGroup);
                    if (foundChannel === null) {
                        let channelFromGuild = findChannelInGuild(channel);
                        if (typeof channelFromGuild !== "undefined") {
                            foundChannelGroup.channels.push(channelFromGuild);
                            msg.channel.send(`The channel **${channelFromGuild.name}** was added to the **${foundChannelGroup.name}** channel group.`);
                        } else {
                            msg.channel.send("Channel was not found");
                        }
                    } else {
                        msg.channel.send(`The Channel **${foundChannel.name}** was already added to the **${foundChannelGroup.name}** channel group.`);
                        return 0;
                    }
                });
            }
        }

        botConfig.channelGroups = configChannelGroups;
        updateBotConfig(botConfig);
    } else {

        let foundChannel = findChannelInGuild(args[0]);
        if (foundChannel !== null) {
            if (botConfig.generalChannels.includes(foundChannel)) {
                msg.channel.send(`The Channel **${foundChannel.name}**(**${foundChannel.id}**) was already added to the general group.`);
                return 0;
            }
            botConfig.generalChannels.push(foundChannel);
            msg.channel.send(`The Channel **${foundChannel.name}**(**${foundChannel.id}**) was added to the general group.`);
            updateBotConfig(botConfig);
        }
    }

    function addChannelsToNewGroup(groupName: string) {
        let newChannelGroup: ChannelGroup = {
            name: groupName,
            channels: []
        }

        args.forEach(arg => {
            let foundChannel = findChannelInGuild(arg);
            if (foundChannel !== null) {
                newChannelGroup.channels.push(foundChannel);
                configChannelGroups.push(newChannelGroup);
                msg.channel.send(`The Channel **${foundChannel.name}**(**${foundChannel.id}**) was added to the **${newChannelGroup.name}** group.`);
            }
        });
    }

    function findChannelInGroup(channelToSearch: string, channelGroup: ChannelGroup): Channel | null {
        if (!isNaN(Number(channelToSearch)) && Number(channelToSearch) !== 0) {
            let foundchannel = channelGroup.channels.find(groupChannel => channelToSearch === groupChannel.id);
            if (typeof foundchannel === "undefined") return null;
            return foundchannel;
        } else {
            let foundchannel = channelGroup.channels.find(groupChannel => channelToSearch === groupChannel.name);
            if (typeof foundchannel === "undefined") return null;
            return foundchannel;
        }
    }

    function findChannelInGuild(channelIdOrName: string): Channel | null {
        if (!isNaN(Number(channelIdOrName)) && Number(channelIdOrName) !== 0) {
            let foundChannel = msg.guild.channels.cache.find(channel => channel.id === channelIdOrName);
            if (typeof foundChannel !== "undefined") {
                return {
                    id: foundChannel.id,
                    name: foundChannel.name
                }
            } else {
                msg.channel.send(`The Channel **${channelIdOrName}** was not found.`);
                return null;
            }
        } else {
            let foundChannel = msg.guild.channels.cache.find(channel => channel.name === channelIdOrName);
            if (typeof foundChannel !== "undefined") {
                return {
                    id: foundChannel.id,
                    name: foundChannel.name
                }
            } else {
                msg.channel.send(`The Channel **${channelIdOrName}** was not found.`);
                return null;
            }
        }
    }


    return 0;
}