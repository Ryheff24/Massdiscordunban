const { Client, Permissions } = require('discord.js'); // V13 Now :]
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');

const rest = new REST({ version: '9' }).setToken(token);

const client = new Client({
  intents: ['GUILDS', 'GUILD_BANS', 'GUILD_MESSAGE_TYPING'],
});

client.once('ready', () => {
  console.log('Bot is online! Use /unban-all to unban all users.');
  console.log(
    `Your Bot invite link: ${client.generateInvite({
      scopes: ['bot', 'applications.commands'],
      permissions: [
        Permissions.FLAGS.SEND_MESSAGES,
        Permissions.FLAGS.BAN_MEMBERS,
        Permissions.FLAGS.KICK_MEMBERS,
      ],
    })}`,
  );
});

client.on('interactionCreate', async (interaction) => {
  await interaction.deferReply();
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === 'unban-all') {
    if (interaction.member.permissions.has('BAN_MEMBERS')) {
      try {
        const bans = await rest.get(Routes.guildBans(interaction.guild.id));
        // console.log(bans);
        // console.log(bans[0]);
        const banNumbers = bans.length;
        await interaction.editReply(
          `Found ${banNumbers} bans in ${interaction.guild.name}`,
        );

        // eslint-disable-next-line no-restricted-syntax
        for (const v of bans) {
          // eslint-disable-next-line no-await-in-loop
          await interaction.editReply(
            `Unbanning user: ${v.user.username}#${v.user.discriminator}`,
          );
          //  console.log(v);

          // eslint-disable-next-line no-await-in-loop
          await interaction.guild.members.unban(v.user.id);
        }
        await interaction.editReply(`Unbanned all ${banNumbers} users`);
      } catch (e) {
        await interaction.editReply(`There was some unexpected error:\n\n${e}`);
      }
    } else {
      await interaction.editReply(
        'You do not have enough permissions for this command.',
      );
      console.log('You do not have enough permissions for this command.');
    }
  }
});

client.login(token);
