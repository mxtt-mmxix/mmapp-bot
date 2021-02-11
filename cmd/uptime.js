const Discord = require('discord.js')
const Command = require('../Command')
const redis = require('redis')
const client = redis.createClient()

const uptime = new Command((msg, redis) => {

    client.get('startTime', (err, reply) => {

        if (err) {
            console.log(err)
            return;
        }

        const startTime = parseInt(reply);
        var uptime = Date.now() - startTime;

        var s, m, h, d;

        if (uptime >= 1000) {
            s = Math.floor(uptime / 1000);
            uptime %= 1000;

            if (s >= 60) {
                m = Math.floor(s / 60);
                s %= 60;

                if (m >= 60) {
                    h = Math.floor(m / 60);
                    m %= 60;

                    if (h >= 24) {
                        d = Math.floor(h / 24);
                        h %= 24;
                    }
                }
            }
        }

        var response = "";

        if (d) response += d.toString() + " dys, "
        if (h) response += h.toString() + " hrs, "
        if (m) response += m.toString() + " min, "
        if (s) response += s.toString() + " sec, "

        response += uptime.toString() + "ms"

        const uptimeEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Uptime')
            .setDescription(response)
            .setFooter("Started: " + (new Date(startTime)).toUTCString())

        msg.channel.send(uptimeEmbed)

    })
})

module.exports = uptime