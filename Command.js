class Command {

    constructor(run) {
        this.arguments = new Map();
        this.run = run
    }

    call(msg, args, cmd = this) {
        if (cmd.arguments.has(args[0])) {
            this.call(msg, args, cmd.arguments.get(args[0]));
        } else {
            cmd.run(msg, args);
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