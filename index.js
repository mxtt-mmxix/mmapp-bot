const discord = require('discord.js');
const { CommandHandler } = require('./CommandHandler');
const client = new discord.Client();

const commandHandler = new CommandHandler('~');

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`);
})

client.on('message', msg => {
    commandHandler.call(msg);
});

client.login(process.env.BOT_AUTH);

commandHandler.attach('ping', msg => {
    msg.reply('pong!');
})

commandHandler.attach('uptime', msg => {

    let milliseconds = (Date.now() - startTime);
    let seconds, minutes, hours, days;

    if (milliseconds >= 1000) {

        seconds = Math.floor(startTime / 1000);
        milliseconds = startTime % 1000;

        if (seconds >= 60) {

            minutes = Math.floor(seconds / 60);
            seconds %= 60;

            if (minutes >= 60) {

                hours = Math.floor(minutes / 60);
                minutes %= 60;

                if (hours >= 24) {

                    days = Math.floor(hours / 24);
                    hours %= 24;

                }

            }

        }

    }

    msg.reply(`Uptime: ${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${minutes ? `${minutes}m ` : ''}${seconds ? `${seconds}s ` : ''}${milliseconds ? `${milliseconds}ms ` : null}`)

})