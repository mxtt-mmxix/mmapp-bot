const Command = require('../Command');
const redis = require('../Redis');

const earnings = new Command(async (msg) => {

    const result = await redis.hget(msg.author.tag, "earnings")
    msg.reply(`you have $${result != null ? result : '0'} earnings.`);

});

module.exports = earnings;