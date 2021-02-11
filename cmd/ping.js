const Discord = require('discord.js')
const Command = require('../Command')

const ping = new Command(async (msg) => {

    const sendTime = Date.now() - msg.createdAt;
    const rmsg = await msg.channel.send("Pinging...");
    const replyTime = rmsg.createdAt - msg.createdAt
    rmsg.edit(
        new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Pong!")
            .addFields(
                { name: "Send", value: sendTime + 'ms', inline: true },
                { name: "Reply", value: replyTime + 'ms', inline: true },
                { name: "Total", value: (replyTime + sendTime) + 'ms', inline: true },
            )
    );
    rmsg.edit('') // The "Pinging" stays there even after the MessageEmbed.
})

module.exports = ping