// index.js
// Import required packages and modules
require('dotenv').config();
const { Client, IntentsBitField, MessagePayload } = require('discord.js');
const { transferXRP } = require('./xrplTransfer'); // Ensure this path is correct.

// Initialize a new Discord client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const userStates = {};

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

    const contentLower = msg.content.toLowerCase();

    // Check for rewards inquiry
    if (contentLower === 'check rewards') {
        // Generate a random reward between 0 and 1 XRP.
        const reward = (Math.random()).toFixed(4);
        
        if (parseFloat(reward) > 0) {
            userStates[msg.author.id] = {
                state: 'awaitingAddress',
                data: { amount: reward }
            };
            msg.reply(`You have a reward of ${reward} XRP! Would you like to claim it? Please reply with your XRP address if you do.`);
        } else {
            msg.reply('You do not have any rewards at the moment.');
        }
        return;
    }

    if (userStates[msg.author.id] && userStates[msg.author.id].state === 'awaitingAddress') {
        userStates[msg.author.id].data.recipientAddress = msg.content;
        userStates[msg.author.id].state = 'awaitingConfirmation';
        msg.reply('Please confirm the transaction by typing "confirm" or type "cancel" to abort.');
        return;
    }

    if (userStates[msg.author.id] && userStates[msg.author.id].state === 'awaitingConfirmation') {
        if (contentLower === 'confirm') {
            const recipientAddress = userStates[msg.author.id].data.recipientAddress;
            const reward = userStates[msg.author.id].data.amount;

             try {
                await transferXRP(recipientAddress, reward);
                msg.reply(`Your ${reward} XRP has been sent to ${recipientAddress}. Please wait a few minutes for the transaction to be confirmed on the XRP ledger.
                           To verify the transaction on the XRP testnet ledger, please click [here](https://testnet.xrpl.org/accounts/${recipientAddress}) or navigate to the following link:
                           https://testnet.xrpl.org/accounts/${recipientAddress}
                           We recommend checking the link to ensure your transaction has been successfully validated.`);
            } catch (error) {
                msg.reply('There was an error transferring your reward. Please try again later.');
            }

            delete userStates[msg.author.id];
            return;
        } else if (contentLower === 'cancel') {
            msg.reply('Transaction aborted.');
            delete userStates[msg.author.id];
            return;
        }
    }

    if (msg.content.toLowerCase() === 'claim nft') {
        const payload = new MessagePayload(msg.channel, { files: ['./assets/ClaimNFT.png'] });
        msg.reply(payload);
        return;
    }
});

// Log in to the Discord server using the token from the environment variables
client.login(process.env.TOKEN);
