require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
  // intents is set of permissions bot can use
  // more info on discord develop intent site
  intents : [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});

client.on('messageCreate', (msg) => {

    if (msg.author.bot){
        return;
    }

    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

// discord bot token password
client.login(process.env.TOKEN);

