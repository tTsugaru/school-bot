import { Message, MessageEmbed } from 'discord.js';
import { commands } from '../command';
import { BotConfig } from '../config';

export default function help(args: string[], msg: Message, botConfig: BotConfig): number {

    if (args.length >= 1) {
        args.forEach(arg => {
            const foundCommand = commands.find(command => command.name === arg || command.aliases.includes(arg));
            const message = new MessageEmbed()
                .setTitle(foundCommand.name)
                .setDescription(foundCommand.description)
                .setFooter("Aliases: \n" + foundCommand.aliases.join(", "))

            msg.channel.send(message);
        });
    } else {
        commands.forEach(command => {
            const message = new MessageEmbed()
                .setTitle(command.name)
                .setDescription(command.description)
                .setFooter("Aliases: \n" + command.aliases.join(", "))

            msg.channel.send(message);
        });
    }

    return 0;
}
