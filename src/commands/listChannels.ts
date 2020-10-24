import { Message } from "discord.js";
import { Config, getConfig } from "../main";

export default function listChannels(args: string[], msg: Message): number {
    const config: Config = getConfig();
    if (!config) {
        msg.channel.send("No bot Config found");
        return;
    }

    config.channels.forEach(async (value, index, _) => {
        const channel = msg.guild.channels.cache.get(value);
        if (typeof (channel) === "undefined") return 0;
        msg.channel.send(`(${index + 1}) -> \`${channel.id} (${channel.name})\``);
        await delay(1000);
    })

}
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}