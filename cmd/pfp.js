const Discord = require('discord.js');
const Command = require('../Command');

const pfp = new Command((msg) => {

    const tagged = msg.mentions.users.first();

    msg.channel.send(
        new Discord.MessageEmbed()
            .setTitle(tagged ? tagged.username : msg.author.username)
            .setColor('#0099ff')
            .setImage(tagged ? tagged.avatarURL() : msg.author.avatarURL())
            .setTimestamp()
    )
});

module.exports = pfp;