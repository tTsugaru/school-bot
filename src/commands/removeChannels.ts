import { Message } from "discord.js";
import { BotConfig, updateBotConfig } from "../config";
import listChannels from "./listChannels";

export default function removeChannels(args: string[], msg: Message, botConfig: BotConfig): number {
    if (args.length <= 0) {
        msg.channel.send("Please specify a channel to remove");
        return;
    }

    if (!botConfig) {
        msg.channel.send("No bot Config found");
        return;
    }

    let configChannelGroups = botConfig.channelGroups;

    if (args.length === 1) {

        let foundChannelGroup = configChannelGroups.find(channelGroup => channelGroup.name === args[0]);
        if (typeof foundChannelGroup === "undefined") {
            msg.channel.send("Cannot find channel group.");
            return 0;
        } else {
            let indexOfGroupToDelete = configChannelGroups.indexOf(foundChannelGroup, 0);
            configChannelGroups.splice(indexOfGroupToDelete, 1);

            updateBotConfig(botConfig);
            msg.channel.send(`The Channel group ${foundChannelGroup.name} was succsessfully deleted with all its channels.`);
        }
    } else {
        let groupName = args.shift();
        let foundChannelGroup = configChannelGroups.find(channelGroup => channelGroup.name === groupName);
        if (typeof foundChannelGroup === "undefined") {
            msg.channel.send("Cannot find channel group.");
            return 0;
        } else {
            args.forEach(arg => {
                let foundChannelToDelete = foundChannelGroup.channels.find(channel => channel.id === arg || channel.name === arg);
                if (typeof foundChannelToDelete === "undefined") {
                    msg.channel.send("This channel was not found in this group.");
                    return 0;
                }

                let indexOfChannelToDelete = foundChannelGroup.channels.indexOf(foundChannelToDelete, 0);
                foundChannelGroup.channels.splice(indexOfChannelToDelete, 1);
                msg.channel.send(`The channel ${foundChannelToDelete.name}(${foundChannelToDelete.id}) was succsessfully deleted from channel group ${foundChannelGroup.name}.`);

            });
            updateBotConfig(botConfig);
        }
    }

    return 0;
}