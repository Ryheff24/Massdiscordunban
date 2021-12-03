const { Client } = require("discord.js"); // V13 Now :]
const { token } = require("./config.json");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_MESSAGE_TYPING"]
});

client.on("ready", () => {
  console.log("Bot is online! Use !unbanall to unban all users.");
});

client.on("messageCreate", message => {
  switch (message.content.toLowerCase()) {
    case "!unbanall":
      if (message.member.permissions.has("BAN_MEMBERS")) {
        message.reply({
          content: "Preparing to mass Unban"
        });
        message.guild.bans
          .fetch()
          .then(bans => {
            // console.log(bans[0]);
            if (bans.size == 0) {
              throw "No members to unban.";
            } else {
              bans.forEach(ban => {
                message.guild.members.unban(ban.user.id);
              });
            }
          })
          .catch(e => message.reply({ content: e }))
          .finally(message.reply({ content: "Process finished" }));
      } else {
        message.reply("You do not have enough permissions for this command");
        console.log("You do not have enough permissions for this command.");
      }
      break;
  }
});

client.login(token);
