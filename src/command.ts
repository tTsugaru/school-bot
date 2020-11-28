import { Message } from 'discord.js';
import addChannels, { addChanneldescription } from './commands/addChannels';
import help from './commands/help';
import listChannels, { listDescription } from './commands/listChannels';
import removeChannels, { removeDescription } from './commands/removeChannels';
import sendToChannels, { sendDescription } from './commands/sendToChannels';
import { BotConfig } from './config';

export default class Command {

    public description: string;

    constructor(readonly name: string, desc: string, readonly aliases: string[], readonly func: (args: string[], msg: Message, botConfig: BotConfig) => number) {
        this.description = desc;
    }

    invoke(args: string[], msg: Message, botConfig: BotConfig): number {
        const ret = this.func(args, msg, botConfig);
        if (typeof (ret) !== "number") return 0;
        return ret;
    }
}



export const commands = [
    new Command("addChannels", addChanneldescription, ["ac", "add"], addChannels),
    new Command("sendToChannels", sendDescription, ["stc", "send"], sendToChannels),
    new Command("removeChannels", removeDescription, ["rc", "remove"], removeChannels),
    new Command("listChannels", listDescription, ["lc", "ls", "list"], listChannels),
    new Command("help", "", ["h", "i", "info"], help)
];