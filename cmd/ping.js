const Command = require('../Command')

const ping = new Command(async (msg) => {
    const rmsg = await msg.channel.send("pong!");
    rmsg.edit("pong! `" + (rmsg.createdAt - msg.createdAt) + "ms`");
})

module.exports = ping