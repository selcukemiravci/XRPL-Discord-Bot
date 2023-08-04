// index.js
require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { spawn } = require('child_process');

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

// When the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// When a message is received
client.on('messageCreate', async (msg) => {
    // Ignore messages from bots
    if (msg.author.bot) {
        return;
    }

    // Check if the message is a command for the Python script (e.g., '!ask')
    if (msg.content.startsWith('!ask')) {
        // Extract the question from the message content
        const question = msg.content.slice(5).trim();

        // log the question on cmd
        console.log(question);
        
        // to joseph / emir, just ask specific question and it'll trigger what you want
        if (msg.content === 'ping') {
            msg.reply('pong');
        }

        // Create a Python child process and pass the question as a command-line argument
        const pythonProcess = spawn('python3', ['chat.py', question]);

        let response = '';

        // Capture the output of the Python script
        pythonProcess.stdout.on('data', (data) => {
            response += data.toString();
        });
        
        // Wait for the Python script to finish
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // If the Python script ran successfully, send the response back to the Discord channel
                msg.reply(response);
            } else {
                console.error(`Python script exited with code ${code}`);
            }
        });
    }
});

// Log in to Discord with the bot token
client.login(process.env.TOKEN);

