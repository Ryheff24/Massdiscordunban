/* eslint-disable no-console */
const {
  Client,
  Permissions,
  // eslint-disable-next-line no-unused-vars
  CommandInteraction,
  // eslint-disable-next-line no-unused-vars
  Message,
  // eslint-disable-next-line no-unused-vars
  MessagePayload,
} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_BANS', 'GUILD_MESSAGE_TYPING'],
});

const onGoingBans = [];

/**
 *
 * @param {CommandInteraction|Message} intermsg
 * @param {MessagePayload} payload
 */
async function editContent(intermsg, payload) {
  // eslint-disable-next-line no-unused-expressions
  (await intermsg.edit) ? intermsg.edit(payload) : intermsg.editReply(payload);
}

/**
 * starts banning members
 * @async
 * @function startBan
 * @param {CommandInteraction|Message} intermsg
 */
async function startBan(intermsg) {
  const { guild } = intermsg;
  const { member } = intermsg;
  console.log(onGoingBans);
  if (onGoingBans.includes(guild.id)) {
    const msg = 'Unban process is already happening in this server';
    editContent(intermsg, msg);
  } else {
    try {
      onGoingBans.push(guild.id);
      if (member.permissions.has('BAN_MEMBERS')) {
        guild.bans.fetch().then(async (bans) => {
          if (bans.size === 0) {
            const msg = 'No members to be unbanned';

            await editContent(intermsg, msg);
          } else {
            const finalMsg = `Unbanned ${bans.size}`;

            // eslint-disable-next-line no-restricted-syntax
            for (const [, ban] of bans) {
              const msg = `Unbanning ${ban.user.tag}`;

              // eslint-disable-next-line no-await-in-loop
              await editContent(intermsg, msg);

              // eslint-disable-next-line no-await-in-loop
              await guild.members.unban(ban.user);
            }

            await editContent(intermsg, finalMsg);
          }
        });
      } else {
        const msg = 'You cannot unban';
        await editContent(intermsg, msg);
      }
      onGoingBans.splice(onGoingBans.indexOf(guild.id));
    } catch (error) {
      const msg = `An unexpected error occurred.\nError dump:\n\n${error}`;
      await editContent(intermsg, msg);
    }
  }
}

client.login(token);
client.once('ready', () => {
  console.log('Bot is online, deploying command...');

  client.application.commands.set([
    {
      name: 'unban-all',
      description: 'Unbans all users',
    },
  ]);

  console.log('Command deployed! Use /unban-all to unban all users.');

  console.log(
    `Your Bot invite link: \n${client.generateInvite({
      scopes: ['bot', 'applications.commands'],
      permissions: [
        Permissions.FLAGS.SEND_MESSAGES,
        Permissions.FLAGS.BAN_MEMBERS,
        Permissions.FLAGS.KICK_MEMBERS,
        Permissions.FLAGS.USE_APPLICATION_COMMANDS,
        Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
        Permissions.FLAGS.READ_MESSAGE_HISTORY,
      ],
    })}`,
  );
});

client.on('interactionCreate', async (interaction) => {
  await interaction.deferReply();
  await interaction.editReply('Please wait');
  await startBan(interaction);
});

client.on('messageCreate', async (message) => {
  const cmdName = message.content.toLowerCase();
  if (cmdName === '!unban-all' || cmdName === '!unbanall') {
    const botMsg = await message.reply('Please wait');
    await startBan(botMsg);
  } else if (cmdName === '!check') {
    message.reply(`${onGoingBans}`);
    console.log(onGoingBans);
  }
});
