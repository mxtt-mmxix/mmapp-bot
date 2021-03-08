const Discord = require('discord.js');
const redis = require('./Redis');
const Command = require('./Command');
const pingCmd = require('./cmd/ping');
const uptimeCmd = require('./cmd/uptime');
const pfpCmd = require('./cmd/pfp');
const earningCmd = require('./cmd/earnings')

const client = new Discord.Client();

var rootCmd;

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`);

    await redis.set('startTime', Date.now());

    rootCmd = new Command((msg) => {
        msg.reply("Sorry, but we do not recognize this command.")
    })

    rootCmd.attach('ping', pingCmd)
    rootCmd.attach('uptime', uptimeCmd)
    rootCmd.attach('pfp', pfpCmd)
    rootCmd.attach('earnings', earningCmd)

});

client.on('message', msg => {

    if (msg.content.startsWith('~')) {
        const args = msg.content.toLowerCase().substring(1).trim().split(/ +/);
        rootCmd.call(msg, args);
    } else {
        redis.lpush(`channel-history-${msg.channel.id}`, msg.id);
        if (redis.llen > 32) {
            redis.ltrim(`channel-history-${msg.channel.id}`, 0, 31);
        }
    }

});

client.login(process.env.BOT_AUTH);