const { Client } = require("discord.js"); // V13 Now :]
const { token, clientId } = require("./config.json");
const client = new Client({
  intents: ["GUILDS", "GUILD_BANS", "GUILD_MESSAGE_TYPING"]
});

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
    .setName("unban-all")
    .setDescription("Unbans all users")
].map(command => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

client.on("ready", () => {
  console.log("Bot is online! Use /unban-all to unban all users.");
});

client.on("interactionCreate", interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === "unban-all") {
    if (interaction.member.permissions.has("BAN_MEMBERS")) {
      interaction.deferReply();
      interaction.guild.bans
        .fetch()
        .then(bans => {
          if (bans.size == 0) {
            interaction.reply({ content: "There are no banned users." });
            throw "No members to unban.";
          }
          bans.forEach(ban => {
            interaction.guild.members.unban(ban.user.id);
          });
        })
        .then(() => {
          interaction.editReply("Users are being unbanned");
          console.log("Users are being unbanned.");
        })
        .catch(e => {
          interaction.editReply(`Unknown error:\n\n${e}`);
          console.log(e);
        })
        .then(interaction.followUp("Mass-Unban successful"));
    } else {
      interaction.reply("You do not have enough permissions for this command.");
      console.log("You do not have enough permissions for this command.");
    }
  }
});

client.login(token);
