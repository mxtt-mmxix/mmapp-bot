const Discord = require('discord.js')

class Command {

    constructor(run) {
        this.arguments = new Map();
        this.run = run
    }

    call(msg, args, cmd = this) {
        if (cmd.arguments.has(args[0])) {
            this.call(msg, args, cmd.arguments.get(args[0]));
        } else {
            try {
                cmd.run(msg, args);
            } catch (e) {
                msg.channel.send(
                    new Discord.MessageEmbed()
                        .setTitle('Error')
                        .setColor('ff0000')
                        .setDescription('Nice, you crashed the bot; Recovering...')
                )
            } finally {
                return
            }
        }
    }

    attach(cmd, cmdObj) {
        this.arguments.set(cmd, cmdObj)
        return this.arguments.get(cmd)
    }

    get(cmd) {
        return this.arguments.get(cmd)
    }

}

module.exports = Command;