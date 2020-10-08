import { Client } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'process';
import { commands } from './command';

export interface Config {
    prefix?: string,
    token: string,
    channels: string[]
}

const configPath = `${__dirname}/../config.json`;
let config = {} as Config;

export function updateConfig(newConfig: Config) {
    try {
        writeFileSync(configPath, JSON.stringify(newConfig));
        console.log("Successfully updated the config");
        config = newConfig;
    } catch (error) {
        console.log("An error occurred while updating the config", error);
        return;
    }
}

export function getConfig(): Config | null {
    try {
        const emptyConfig: Config = {
            channels: [],
            token: "",
            prefix: null
        };

        const loadedConfig: Config = JSON.parse(readFileSync(configPath).toString());

        if (loadedConfig === emptyConfig) {
            return null;
        }

        return loadedConfig ? loadedConfig : null;
    } catch {
        console.log("No Config was Found need to be created.")
        return null;
    }
}

function createConfig() {

    const newConfig: Config = {
        token: "",
        prefix: null,
        channels: []
    };

    writeFileSync(configPath, JSON.stringify(newConfig));
    config = newConfig;
    // TODO: updateConfig

}

const bot = new Client();

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
}

startBot();

// Bot Events
bot.once('ready', () => {
    console.log("Bot is ready and started!");
});

bot.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    let args = message.content.slice(config.prefix.length).trim().split(/ +/s);
    let commandName = args.shift();
    if (!commandName) return;

    console.log(args, commandName);

    let commandFound = false;
    for (const cmd of commands) {

        if (cmd.name !== commandName && !cmd.aliases.includes(commandName)) continue;

        commandFound = true
        const retNumber = cmd.invoke(args, message);
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


export function getChannel(id: string) {
    bot.channels.cache.get
}