[![GitHub](https://img.shields.io/github/license/Rushifaaa/school-bot?style=flat-square)](./LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/Rushifaaa/school-bot?style=flat-square)](https://github.com/Rushifaaa/school-bot/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/Rushifaaa/school-bot?style=flat-square)](https://github.com/Rushifaaa/school-bot/issues)
[![Discord](https://img.shields.io/discord/508727953350328320?style=flat-square)](https://discord.gg/kFqWZtv)

<p align="center">
  <h3 align="center">School Bot</h3>
</p>

## Table of Contents
* [Setup](#setup)
* [Commands](#commands) 
* [License](#license)
* [Contact](#contact)

## Setup
First you will need [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)(comes with node).
If you installed one of these then go to the root and execute `yarn install` or `npm i`.
After that you need to start the Bot with `yarn start` or `npm start`.
If you are starting for the first time it will create a config for you, please enter your Bot Token there with your desired prefix, after that the Bot should start without any problems.

PS. Don't forget to add your ID to the config to execute commands!

## Commands
The Prefix must be defined in the Config of the Bot!

* Add
  * `add <channel_id / name>` - Adds a channel to the general Channelgroup.
  * `add general [channel_id / name]` - Multiple channels can be added to the general group.
  * `add <groupname> [channel_id / name]` - Adds a channel to the given group / Multiple channels can be added.

* Remove
  * `remove <channel_id / name>` - Removes a channel from the general group.
  * `remove general` - Removes all channel from the general channel group.
  * `remove <groupname>` - Removes all channel from the given group.
  * `remove <groupname> [channel_id / name]` - Removes one or more channel of the given group.

* List
  * `list` or `list general` - Lists all channels from the general group.
  * `list <groupname>` - Lists all Channels from the given group.

* Send
  * `send general <text>` - Sends a text to all channel from the general group.
  * `send <groupname> <text>` - Sends a text to all channels from the given group.
  * If you attach an image to a message it will be sent with the message


## License
Distributed under the GPL-3.0 License. See [`LICENSE`](./LICENSE) for more information.


## Contact
You can contact me on [Discord](https://discord.gg/kFqWZtv)
