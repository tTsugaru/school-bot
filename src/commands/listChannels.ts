import { Message, MessageEmbed } from "discord.js";
import { BotConfig, getConfig } from "../config";

export default function listChannels(args: string[], msg: Message, botConfig: BotConfig): number {
    if (!botConfig) {
        msg.channel.send("No bot Config found");
        return;
    }


    if (args.length === 1) {

        if (args[0] === "general") {
            listGeneralChannels();
            return 0;
        }

        let channelGroups = botConfig.channelGroups;
        let foundChannelGroup = channelGroups.find(cg => cg.name === args[0]);
        if (typeof (foundChannelGroup) !== "undefined" && foundChannelGroup.channels.length > 0) {
            let embedMessage = new MessageEmbed()
                .setTitle(`**${foundChannelGroup.name}**`)
                .setDescription(`\`\`\`JSON
${JSON.stringify(foundChannelGroup.channels, null, 2)}
\`\`\``)
                .setColor("RED");

            msg.channel.send(embedMessage);
        } else {
            msg.channel.send("This channel group was not found :(");
        }


    } else {
        listGeneralChannels();
    }

    function listGeneralChannels() {
        let generalChannelGroup = botConfig.generalChannels;

        if (generalChannelGroup.length > 0) {
            let embedMessage = new MessageEmbed()
                .setTitle(`**Global Channels**`)
                .setDescription(`\`\`\`JSON
${JSON.stringify(generalChannelGroup, null, 2)}
\`\`\``)
                .setColor("GOLD");

            msg.channel.send(embedMessage);
        } else {
            msg.channel.send("No channels in the general Channel group.");
        }
        return 0;
    }
}
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const listDescription: string = `Lists the given group or general group.\n **Usage:** \n - \`${getConfig().prefix}list general/<groupname>\``
