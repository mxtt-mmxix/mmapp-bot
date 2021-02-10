const redis = require('redis')
const redisClient = redis.createClient();

class CommandHandler {

    constructor(prefix) {
        this.prefix = prefix
        this.commandMap = new Map();
    }


    attach(command, callback) {
        this.commandMap.set(command, callback);
    }

    call(msg) {

        if (msg.content.charAt(0) === this.prefix) {

            let callback = this.commandMap.get(msg.content.substring(1));

            if (callback != null || callback != undefined) {
                callback(msg, redisClient);
            }

        }

    }

}

exports.CommandHandler = CommandHandler;