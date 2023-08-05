// index.js
// Import required packages and modules
require('dotenv').config();
const { Client, IntentsBitField, MessageAttachment } = require('discord.js'); // Import MessageAttachment for sending images
const { spawn } = require('child_process');

// Initialize a new Discord client
const client = new Client({
    intents : [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
});

// Event to log once the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Event for when a message is created in the server
client.on('messageCreate', async (msg) => {
    // If the message is from a bot, ignore it
    if (msg.author.bot) {
        return;
    }

    // Check if the message is "Claim NFT" (case insensitive)
    // If so, attach the "ClaimNFT.png" image from the assets directory and send it
    // Then return to prevent executing any further code in this callback
    if (msg.content.toLowerCase() === 'claim nft') {
        const image = new MessageAttachment('./assets/ClaimNFT.png');
        msg.channel.send({ files: [image] }); 
        return;
    }

    // Check if the message starts with "!ask" command
    if (msg.content.startsWith('!ask')) {
        const question = msg.content.slice(5).trim(); 
        console.log(question); 

        // If the message is "ping", reply with "pong"
        if (msg.content === 'ping') {
            msg.reply('pong');
        }

        // Spawn a Python child process with the question as an argument
        const pythonProcess = spawn('python3', ['chat.py', question]);
        let response = '';

        // Listen to the "data" event of the python process's stdout stream and accumulate the data
        pythonProcess.stdout.on('data', (data) => {
            response += data.toString();
        });

        // Listen to the "close" event of the python process
        pythonProcess.on('close', (code) => {
            // If the process ended successfully, reply with the accumulated response
            // Otherwise, log the exit code to the console
            if (code === 0) {
                msg.reply(response);
            } else {
                console.error(`Python script exited with code ${code}`);
            }
        });
    }
});

// Log in to the Discord server using the token from the environment variables
client.login(process.env.TOKEN);
