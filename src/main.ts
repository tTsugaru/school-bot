import { Client } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';

interface Config {
    prefix?: string,
    token: string,
    channels: string[]
}

const configPath = `${__dirname}/../config.json`;

function configCheck(): Config | null {
    const config: Config = JSON.parse(readFileSync(configPath).toString());
    return config ? config : null;
}

function createConfig() {

    const config: Config = {
        token: "",
        prefix: null,
        channels: []
    }
    writeFileSync(configPath, JSON.stringify(config));

}

const bot = new Client();

const config = configCheck();
if (config === null) {
    createConfig();
}