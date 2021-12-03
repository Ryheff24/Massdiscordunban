# Mass Discord Unban bot

A discord bot to mass unban users in a server in the event of spam/rogue/malicious bot banning all users or simply to mass unban.

The codebase has both approaches (i.e. variants): prefix bot command & slash command.
Slash command bot version: v2.1.0
Prefix command bot version: v1.2.0

For v1.1 or v1.0 refer the old [guide](./README_old.md)

## Setup instructions

The instructions are same for both the approaches. The minute details will be mentioned in wherever needed.

### Installing dependencies

First install [Node.js](https://nodejs.org/en/download/current/) v16.6.0 or higher. Or follow this [guide](https://discordjs.guide/preparations/)

Then clone/download this repository and open the folder containing bot files.
Some of the files should files should be: `bot1.js`, `bot2.js`, `deploy-commands.js`.

Open terminal in that folder (Command prompt, Powershell, Bash, etc) and run this command:

```bash
npm install
```

### Creating & Adding a Bot

#### Creating a Bot

Follow this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to create the bot.

In the Bot page while copying token scroll down & select these:

![Authorization Flow](https://i.imgur.com/2vuo9VL.png)

_You may select `Public bot`, but it is not required. If selected anyone can invite your bot. If not, no body except you can invite bot._

![Privileged Gateway Intents](https://i.imgur.com/NJUFUkj.png)
_**Note:**: For prefix based bot, select all intents_

#### Adding the bot

Follow this [guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html) to get bot invite link.

While setting up the invite link, make sure you select these bot permissions:

![Bot Permissions](https://i.imgur.com/Rmon7OJ.png)

_You may select Administrator permission instead of the above given permissions so that the bot works flawlessly_

**Note:** You must have `Manage Server` permission or `Administrator` permission on the server where you will be adding the bot.

#### Creating config.json

[Guide](https://discordjs.guide/creating-your-bot/#using-config-json)

Copy `clientId` from OAuth2 page.
![Copying Client ID](https://i.imgur.com/aiBC8cF.png)

Copy `token` from Bot page.
![Copying Bot Token](https://i.imgur.com/DUKebFW.png)

Create a new file called `config.json` and put the following:

```js
{
  "token": "insert-bot-token-here",
  "clientId": "insert-clientId"
}
```

_`clientId` is optional for prefix based bot_

## Usage

If you have followed the steps correctly till now, then the basic setup is done!

The only thing remains is to turn on the bot.

### For Prefix command based bot

Open terminal in the bot folder and run the following command:

```bash
npm run bot1
```

In the terminal window you will see:

```bash
> massdiscordunban@2.0.0 bot1
> node bot1.js

Bot is online! Use !unbanall to unban all users.
```

### For Slash command based bot

Open terminal in the bot folder and run the following command:

```bash
npm run bot2
```

In terminal you will see

```bash
> massdiscordunban@2.0.0 prebot2
> node deploy-commands.js

Successfully registered application commands.

> massdiscordunban@2.0.0 bot2
> node bot2.js

Bot is online! Use /unban-all to unban all users.
```

Open discord, and use the slash command: `/unban-all`.

### After executing command

Wait for the bot to finish unbanning.

To check if the bot has unbanned all users, go to Server Settings > Bans.
There you should see 0 Bans or `NO BANS`.

# I need HALP!

Sometimes you might run into an issue that Slash command bot is not working.
So follow this in order:

-   Switch off the bot (i.e. close terminal)
-   Kick the bot (this is important)
-   Switch on the bot
-   Invite the bot
-   Run the command again.

Incase of any issues, contact:

Ryheff24 on [Twitter](https://twitter.com/Ryheff24) or on Discord: `Ryheff24#6774`

# License

[MIT](./LICENSE)
