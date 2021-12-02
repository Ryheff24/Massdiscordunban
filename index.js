
const { Client } = require("discord.js"); // V13 Now :]
const { token } = require("./config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "9" }).setToken(token);
const client = new Client({
  intents: ["GUILDS", "GUILD_BANS", "GUILD_MESSAGE_TYPING"]

});

client.once("ready", () => {
  console.log("Bot is online! Use /unban-all to unban all users.");
});

client.on("interactionCreate", async interaction => {
  await interaction.deferReply();
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === "unban-all") {
    if (interaction.member.permissions.has("BAN_MEMBERS")) {
      try {
        const bans = await rest.get(Routes.guildBans(interaction.guild.id));
        //console.log(bans);
        console.log(bans[0]);
        const banNumbers = bans.length;
        await interaction.editReply(
          `Found ${banNumbers} bans in ${interaction.guild.name}`
        );

        for (const v of bans) {
          await interaction.editReply(
            `Unbanning user: ${v.user.username}#${v.user.discriminator}`
          );
          //  console.log(v);

          await interaction.guild.members.unban(v.user.id);
        }
        await interaction.editReply(`Unbanned all ${banNumbers} users`);
      } catch (e) {
        await interaction.editReply(`There was some unexpected error:\n\n${e}`);

      }
    } else {
      await interaction.editReply(
        "You do not have enough permissions for this command."
      );
      console.log("You do not have enough permissions for this command.");
    }
  }
});

client.login(token);
