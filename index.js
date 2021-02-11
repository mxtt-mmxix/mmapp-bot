const Discord = require('discord.js')
const redis = require('./Redis')
const Command = require('./Command')
const pingCmd = require('./cmd/ping')
const uptimeCmd = require('./cmd/uptime')

const client = new Discord.Client()

var rootCmd;

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`);

    await redis.set('startTime', Date.now());

    rootCmd = new Command((msg) => {
        msg.reply("Sorry, but we do not recognize this command.")
    })

    rootCmd.attach('ping', pingCmd)
    rootCmd.attach('uptime', uptimeCmd)

});

client.on('message', msg => {

    if (msg.content.startsWith('~')) {
        const args = msg.content.toLowerCase().substring(1).trim().split(/ +/);
        rootCmd.call(msg, args)
    }

});

client.login(process.env.BOT_AUTH)