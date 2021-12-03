const { Client } = require("discord.js"); // V13 Now :]
const { token } = require("./config.json");
const client = new Client({
  intents: ["GUILDS", "GUILD_BANS", "GUILD_MESSAGE_TYPING"]

});

client.once("ready", () => {
  console.log("Bot is online! Use !unban-all to unban all users.");
});

client.on("messageCreate", message => {
  switch (message.content.toLowerCase()) {
    case "!unbanall":
      if (message.member.permissions.has("BAN_MEMBERS")) {
        message.guild.bans
          .fetch()
          .then(bans => {
            if (bans.size == 0) {
              message.reply({ content: "There are no banned users." });
              throw "No members to unban.";
            }
            bans.forEach(ban => {
              message.guild.members.unban(ban.user.id);
            });
          })
          .then(() => console.log("Users are being unbanned."))
          .catch(e => console.log(e))
          .then(message.reply({ content: "Mass-Unban successful" }));
      } else {
        console.log("You do not have enough permissions for this command.");
      }
      break;
  }
});

client.login(token);
