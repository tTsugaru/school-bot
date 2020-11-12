import { readFileSync, writeFileSync } from "fs";

export interface Config {
    botOwner: string;
    prefix?: string;
    token: string;
}

export interface BotConfig {
    channelGroups: ChannelGroup[];
    generalChannels: Channel[];
}

export interface ChannelGroup {
    name: string;
    channels: Channel[];
}

export interface Channel {
    id: string;
    name: string;
}

const configPath = `${__dirname}/../config.json`;
const botConfigPath = `${__dirname}/../botConfig.json`;

export function updateConfig(newConfig: Config): Config {
    try {
        writeFileSync(configPath, JSON.stringify(newConfig));
        console.log("Successfully updated the config");
        return newConfig;
    } catch (error) {
        console.log("An error occurred while updating the config", error);
        return;
    }
}

export function getConfig(): Config | null {
    try {
        const emptyConfig: Config = {
            botOwner: "",
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

export function createConfig(): Config {

    const newConfig: Config = {
        botOwner: "",
        token: "",
        prefix: null
    };

    try {
        writeFileSync(configPath, JSON.stringify(newConfig));
    } catch {
        console.log("An error occurred while creating config!");
    }
    return newConfig;
}

export function createBotConfig(): BotConfig {
    const newBotConfig: BotConfig = {
        channelGroups: [],
        generalChannels: []
    };

    try {
        writeFileSync(botConfigPath, JSON.stringify(newBotConfig));
    } catch {
        console.log("An error occurred while creating the BotConfig!");
    }
    return newBotConfig;
}

export function updateBotConfig(newBotConfig: BotConfig): BotConfig {
    try {
        writeFileSync(botConfigPath, JSON.stringify(newBotConfig));
        console.log("Successfully updated the config");
        return newBotConfig;
    } catch (error) {
        console.log("An error occurred while updating the config", error);
    }
}

export function getBotConfig(): BotConfig | null {
    try {
        const emptyBotConfig: BotConfig = {
            channelGroups: [],
            generalChannels: []
        };

        const loadedBotConfig: BotConfig = JSON.parse(readFileSync(botConfigPath).toString());

        if (loadedBotConfig === emptyBotConfig) {
            return null;
        }

        return loadedBotConfig ? loadedBotConfig : null;
    } catch {
        console.log("No Config was Found need to be created.")
        return null;
    }
}