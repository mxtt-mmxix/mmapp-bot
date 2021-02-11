const Discord = require('discord.js');
const Command = require('../Command');

const ping = new Command(async (msg) => {

    const sendTime = Date.now() - msg.createdAt;
    const rmsg = await msg.channel.send("Pinging...");
    const replyTime = rmsg.createdTimestamp - (msg.createdTimestamp + sendTime);

    rmsg.edit(
        new Discord.MessageEmbed()
            .setColor('#ffef00')
            .setTitle("Pong!")
            .addFields(
                { name: "Send", value: sendTime + 'ms', inline: true },
                { name: "Reply", value: replyTime + 'ms', inline: true },
                { name: "Total", value: (rmsg.createdAt - msg.createdAt) + 'ms', inline: true },
            )
    );

    rmsg.edit('') // The "Pinging" stays there even after the MessageEmbed.
});

module.exports = ping;