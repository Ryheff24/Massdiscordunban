const {
	REST,
	Routes,
	Client,
	GatewayIntentBits,
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require('discord.js');
const { token } = require('./config.json');
const commands = [
	new SlashCommandBuilder()
		.setName('unbanall')
		.setDescription('Unbans all users from the server')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
];
const rest = new REST({ version: '10' }).setToken(token);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on('ready', async () => {
	client.application.commands.set(commands);
	console.log('Your bot invite:', client.generateInvite({ scopes: ['bot', 'applications.commands'], permissions: [PermissionFlagsBits.BanMembers, PermissionFlagsBits.KickMembers, PermissionFlagsBits.SendMessages] }));
	// const userid = client.user.id;
	// await regeisterCommands(userid);
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'unbanall') {
		const user = interaction.guild.members.cache.get(interaction.member.id);
		const guild = interaction.guild;
		if (user.permissions.has([PermissionFlagsBits.BanMembers])) {
			try {
				await interaction.reply('Starting unban...');
				const bans = await rest.get(Routes.guildBans(guild.id));
				const banNumbers = bans.length;
				await interaction.editReply(
					`Found ${banNumbers} bans in ${guild.name}`,
				);
				for (const v of bans) {
					await interaction.guild.members.unban(v.user.id);
				}
				await interaction.editReply(`Unbanned all ${banNumbers} users`);
			}
			catch (e) {
				await interaction.editReply(`There was some unexpected error:\n\n${e}`);
			}
		}
		else {
			await interaction.reply('You do not have permission to use this command');
		}
	}
});

client.login(token);
