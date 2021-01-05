const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Bot is online! Use !unbanall to unban all users.');
});

client.on("message", message => {
    
    switch(message.content.toLowerCase()) {
        case ("!unbanall"):
            if (message.member.hasPermission("BAN_MEMBERS")) {
                message.guild.fetchBans().then(bans => {
                    if (bans.size == 0) {message.reply("There are no banned users."); throw "No members to unban."};
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);                     
                    })
                }).then(() => console.log("Users are being unbanned.")).catch(e => console.log(e))
            } else {console.log("You do not have enough permissions for this command.")}
        break;
    }
});

client.login('insert token here');