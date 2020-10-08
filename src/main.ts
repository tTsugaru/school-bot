import { BroadcastDispatcher, Client } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'process';
import { start } from 'repl';

interface Config {
    prefix?: string,
    token: string,
    channels: string[]
}

const configPath = `${__dirname}/../config.json`;
let config = {} as Config;

function configCheck(): Config | null {
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
    const loadedConfig = configCheck();
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
        console.log("Starting bot.")
        bot.login(config.token);
        console.log("Bot Started.. Loged in as " + bot.user.username);
    }
}

startBot();