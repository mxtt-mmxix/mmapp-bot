const Discord = require('discord.js');

const Command = require('../Command');
const redis = require('../Redis');

const snipe = new Command(async msg => {

    var i = 1;

    const channel_key = `channel-history-${msg.channel.id}`
    const length = await redis.llen(channel_key)
    var message_dump = await redis.lrange(channel_key, 0, length)

    message_dump.forEach(async history_msg => {

        const parsed_msg = history_msg.split('##')

        msg.channel.send(new Discord.MessageEmbed()
            .setAuthor(parsed_msg[0], parsed_msg[2], 'https://example.com')
            .setDescription(parsed_msg[1])
            .setFooter(`(${i}/${length})`)
        );

        i++;

    });

});

module.exports = snipe;