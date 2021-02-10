const Command = require('../Command')

const ping = new Command((msg) => {
    msg.reply("pong!")
})

module.exports = ping