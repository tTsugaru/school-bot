import { Message } from 'discord.js';
import { Config, getConfig, updateConfig } from '../main';

export default function addChannels(args: string[], msg: Message): number {
    if (args.length <= 0) {
        msg.channel.send("Please specify a channel to add");
        return;
    }

    const config: Config = getConfig();
    if (!config) {
        msg.channel.send("No bot Config found");
        return;
    }

    args.forEach(arg => {
        console.log(arg);
        if (!isNaN(Number(arg)) && Number(arg) !== 0) {
            const channel = msg.guild.channels.cache.get(arg);
            if (typeof (channel) === "undefined") {
                msg.channel.send(arg + " <- this channel does not exist :expressionless:");
                return 0;
            }
            config.channels.push(arg);
        } else {
            const channel = msg.guild.channels.cache.find((channel, _) => channel.name === arg);
            if (typeof channel !== "undefined") {
                config.channels.push(channel.id);
                return 0;
            }
            msg.channel.send(arg + " <- this channel does not exist :expressionless:");
            return 0;
        }
    });

    updateConfig(config);
    msg.channel.send("Added the Channel(s) into the config");
    return 0;
}