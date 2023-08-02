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

    if (msg.content === 'what is xrp?') {
      msg.reply('XRP is the native cryptocurrency of the XRP Ledger. All accounts in the XRP Ledger can send XRP among one another and must hold a minimum amount of XRP as a reserve. XRP can be sent directly from any XRP Ledger address to any other. This helps make XRP a convenient bridge currency.');
    }
});

// discord bot token password
client.login(process.env.TOKEN);

