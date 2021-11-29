# Mass Discord Unban bot

Used to mass unban discord users in the case of a mass discord ban spam bot or just a mass discord unban.

# Installation

## Download the Files

-   Start by installing [Node.js](https://nodejs.org/en/download/). (Version 16+ Required)
-   Next download the latest release & unzip the file.
-   Or clone this repository.
-   Open the folder that contains the `index.js` file.

## NPM Installation

-   Open terminal (Windows Command prompt, PowerShell, Bash, etc).
-   Navigate to the Folder where the `index.js` file is.
-   run `npm install`

# Creating/Adding a Bot

Follow this guide on how to setup a bot application [Here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

Find the following code and insert the token.

```js
client.login('insert token here')
```

Next on the Discord developers page navigate to OAuth2.

Under SCOPES Select Bot and scroll down to BOT PERMISSIONS and select Ban Members. Make sure to select all privileged intents

Copy the discord link above and add to the server.

Note you MUST have Manage Server/Server Administrator permissions to add a bot.

# Usage

After you have installed the NPM packages and created a bot you are now ready to run the bot.

In the command prompt run `node index.js` or `npm start`

After you will get a message saying `Bot is online! Use !unbanall to unban all users.`

To start the unban process type `!unbanall` in a Discord channel.

Please allow time for the bot to unban.

To check if the bot is finished, on Discord navigate to Server Settings > Bans you will see `NO BANS` in the top left corner.

If you have any problems Send a message on [Twitter](https://twitter.com/Ryheff24) or Discord: Ryheff24#6774
