import { Message } from 'discord.js';
import addChannels from './commands/addChannels';
import listChannels from './commands/listChannels';
import removeChannels from './commands/removeChannels';
import sendToChannels from './commands/sendToChannels';

export default class Command {

    constructor(readonly name: string, readonly aliases: string[], readonly func: (args: string[], msg: Message) => number) {
        //EMPTY....
    }

    invoke(args: string[], msg: Message): number {
        const ret = this.func(args, msg);
        if (typeof (ret) !== "number") return 0;
        return ret;
    }
}

export const commands = [
    new Command("addChannels", ["ac", "add"], addChannels),
    new Command("sendToChannels", ["stc", "send"], sendToChannels),
    new Command("removeChannels", ["rc", "remove"], removeChannels),
    new Command("listChannels", ["lc", "ls", "list"], listChannels) 
];