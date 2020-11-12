import { Client } from 'discord.js';
import { exit } from 'process';
import { commands } from './command';
import { Config, BotConfig, getConfig, createConfig, getBotConfig, createBotConfig } from './config';

const bot = new Client();

let config: Config = {} as Config
let botConfig: BotConfig = {} as BotConfig

function startBot() {
    const loadedConfig = getConfig();
    if (loadedConfig === null) {
        createConfig();
        console.log("Config was created.. please setup :)");
        console.log(loadedConfig);
        exit(0);
    } else if (loadedConfig === undefined) {
        console.log(loadedConfig);
        console.log("Please setup config");
        exit(0);
    }
    config = loadedConfig

    if (config.token === "") {
        console.log(loadedConfig);
        console.log("No token was found!");
        exit(0);
    } else if (config.prefix === null || config.prefix === "") {
        console.log(loadedConfig);
        console.log("No prefix was found!");
        exit(0);
    } else {
        console.log("Starting bot.");
        bot.login(config.token);
    }

    let loadedBotConfig = getBotConfig();
    if (loadedBotConfig === null) {
        botConfig = createBotConfig();
    }
}

startBot();

// Bot Events
bot.once('ready', () => {
    console.log("Bot is ready and started!");
});

bot.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    if (config.botOwner !== message.author.id) {
        message.channel.send("You are not allowed to execute this command!");
        return;
    }
    botConfig = getBotConfig();
    console.log(botConfig);

    let args = message.content.slice(config.prefix.length).trim().split(/ +/s);
    let commandName = args.shift();
    if (!commandName) return;

    console.log(args, commandName);

    let commandFound = false;
    for (const cmd of commands) {

        if (cmd.name !== commandName && !cmd.aliases.includes(commandName)) continue;

        commandFound = true
        const retNumber = cmd.invoke(args, message, botConfig);
        console.log(`The User ${message.author.username} (${message.author.id}) executed the command "${cmd.name}" with this args -> ${args.length > 0 ? args : "[]"}`);
        if (retNumber === 1) {
            bot.destroy();
        }
        break;
    }
    if (!commandFound) {
        message.reply("This command is not supported");
    }
});

// Process
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});