/**
 * @file
 * @author
 * @description
 */

const { Client, Intents } = require('discord.js');
const { spawn } = require('child_process');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


