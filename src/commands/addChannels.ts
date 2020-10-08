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
            config.channels.push(arg);
        } else {
            msg.channel.send(arg + " <- this isn't a channel ID :expressionless:");
        }
    });

    updateConfig(config);
    msg.channel.send("Added the Channel(s) into the config");
    return 0;
}