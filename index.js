const Discord = require('discord.js');
const redis = require('./Redis');
const Command = require('./Command');
const pingCmd = require('./cmd/ping');
const uptimeCmd = require('./cmd/uptime');
const pfpCmd = require('./cmd/pfp');
const earningCmd = require('./cmd/earnings')
const dumpCmd = require('./cmd/dump')

const client = new Discord.Client();

var rootCmd;

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}!`);

    await redis.set('startTime', Date.now());

    rootCmd = new Command((msg) => {
        msg.reply("Sorry, but we do not recognize this command.");
    })

    rootCmd.attach('ping', pingCmd);
    rootCmd.attach('uptime', uptimeCmd);
    rootCmd.attach('pfp', pfpCmd);
    rootCmd.attach('earnings', earningCmd);
    rootCmd.attach('dump', dumpCmd);

});

client.on('message', msg => {

    if (msg.author.bot) return;

    if (msg.content.startsWith('~')) {
        const args = msg.content.toLowerCase().substring(1).trim().split(/ +/);
        rootCmd.call(msg, args);
    } else {

        const historyKey = `channel-history-${msg.channel.id}`

        redis.rpush(historyKey, `${msg.author.tag}##${msg.content}##${msg.author.avatarURL()}`);
        if (redis.llen(historyKey) > 16) {
            redis.ltrim(historyKey, -17, -1);
        }

    }

});

client.login(process.env.BOT_AUTH);