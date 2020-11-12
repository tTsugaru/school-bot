import { Message } from "discord.js";

export default function removeChannels(args: string[], msg: Message): number {
    if (args.length <= 0) {
        msg.channel.send("Please specify a channel to remove");
        return;
    }

    // const config: Config = getConfig();
    // if (!config) {
    //     msg.channel.send("No bot Config found");
    //     return;
    // }

    // args.forEach(arg => {
    //     if (!isNaN(Number(arg)) && Number(arg) !== 0) {
    //         const indexOfArg = config.channels.indexOf(arg);
    //         if (indexOfArg > -1) {
    //             config.channels.splice(indexOfArg, 1);
    //             const channel = msg.guild.channels.cache.get(arg);
    //             msg.channel.send(`Channel with the ID: \`${arg} (${channel.name})\`, was successfully deleted from the Config.`);
    //         } else {
    //             console.log("Channel with ID: `" + arg + "`, was not found.");
    //         }
    //     } else {
    //         const channel = msg.guild.channels.cache.find((channel, key) => channel.name === arg);
    //         if (typeof (channel) !== "undefined") {
    //             const indexOfArg = config.channels.indexOf(channel.id);
    //             if (indexOfArg > -1) {
    //                 config.channels.splice(indexOfArg, 1);
    //                 msg.channel.send(`Channel with the ID: \`${channel.id} (${arg})\`, was successfully deleted from the Config.`);
    //             }
    //             return 0;
    //         }
    //         msg.channel.send("Channel with the Name: `" + arg + "`, was not found.");
    //         return 0;
    //     }
    // });

    // updateConfig(config);
    return 0;
}