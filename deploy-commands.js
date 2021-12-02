const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("./config.json");

const { SlashCommandBuilder } = require("@discordjs/builders");

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
