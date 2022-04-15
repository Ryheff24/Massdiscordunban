# Mass Discord Unban bot

A discord bot to mass unban users in a server in the event of spam/rogue/malicious bot banning all users or simply to mass unban.

v3 now comes with less amount of files & confusion!

For older releases, please check [here](https://github.com/Ryheff24/Massdiscordunban/releases) or [here](https://github.com/Ryheff24/Massdiscordunban/tags)

## Setup instructions

These are nearly same as previous version. Just comes with minor changes.

1. [Installing dependencies](#installing-dependencies)
2. [Creating and Adding bot](#creating--adding-a-bot)

### Installing dependencies

First install [Node.js](https://nodejs.org/en/download/current/) v16.6.0 or higher. Or follow this [guide](https://discordjs.guide/preparations/)

Then clone/download this repository and open the folder containing bot files.

Two of those files should be: `index.js` & `package.json.`

Open terminal in that folder (Command prompt, Powershell, Bash, etc) and run this command:

```bash
npm install --only=prod
```

OR

```bash
npm install
```

### Creating & Adding a Bot

#### Creating a Bot

Follow this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to create the bot.

Navigate to the OAuth2 tab in the Discord Developers Dashboard and select URL Generator.

After input the following settings as shown below(applications.commands **IS REQUIRED**):

![Authorization Flow](https://i.imgur.com/dM2KQev.png)

_You may select `Public bot`, but it is not required. If selected anyone can invite your bot. If not, no body except you can invite bot._

![Privileged Gateway Intents](https://i.imgur.com/wunzGqb.png)
_**Note:**: Prefix command will not work if Message Content intent is unselected. Only Slash command will work._

#### Adding the bot

_This step is optional as the bot shows invite link in console window itself_

Follow this [guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html) to get bot invite link.

While setting up the invite link, make sure you select these bot permissions:

![Bot Permissions](https://i.imgur.com/3ZBUVmj.png)

_You may select Administrator permission instead of the above given permissions so that the bot works flawlessly_

**Note:** You must have `Manage Server` permission or `Administrator` permission on the server where you will be adding the bot.

#### Creating config.json

[Guide](https://discordjs.guide/creating-your-bot/#using-config-json)

Copy `token` from Bot page.
![Copying Bot Token](https://i.imgur.com/DUKebFW.png)

Create a new file called `config.json` and put the following:

```js
{
  "token": "insert-bot-token-here"
}
```

## Usage

If you have followed the steps correctly till now, then the basic setup is done!

The only thing remains is to Switch on the bot.

Open terminal in the bot folder and run the following command:

```bash
npm start
```

In terminal window you will see:

```bash
Bot is online, deploying command...
Command deployed! Use can use any of the following to unban all users:
 /unban-all (slash command, recommended)
 !unbanall (prefix command)
 !unban-all (prefix command)
Your Bot invite link:
https://discord.com/api/oauth2/authorize?client_id=<your_client_Id>&scope=bot+applications.commands&permissions=277025458182
```

You may click on the link to invite the bot if haven't done yet.

Open Discord and use any of the following:

- /unban-all (slash command, recommended)
- !unbanall (prefix command)
- !unban-all (prefix command)

### After executing command

Wait for the bot to finish unbanning.

To check if the bot has unbanned all users, go to Server Settings > Bans.
There you should see 0 Bans or `NO BANS`.

# I need HALP!

Sometimes you might run into an issue that Slash command bot is not working.
It is because the commands are getting registered in background still and thus not able to use the command.
In that case, wait for a minute or two and then run again.

If it is not working still, follow this in order:

- Switch off the bot (i.e. close terminal)
- Kick the bot (this is important)
- Switch on the bot
- Invite the bot
- Run the command again.

In case of any issues, contact:

Ryheff24 on [Twitter](https://twitter.com/Ryheff24) or on Discord: `Ryheff24#6774`

# License

[MIT](./LICENSE)
