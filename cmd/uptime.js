const Command = require('../Command')
const util = require('util')
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

        if (d) response += d.toString() + "d "
        if (h) response += h.toString() + "h "
        if (m) response += m.toString() + "m "
        if (s) response += s.toString() + "s "

        response += uptime.toString() + "ms"

        msg.channel.send("Uptime: " + response)

    })
})

module.exports = uptime