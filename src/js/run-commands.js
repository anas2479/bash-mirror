const allCommands = require('./commands.config')

module.exports = class RunCommands{
    constructor(name, args){
        
        let foundCommand = _.find(allCommands,{name:name})

        if (foundCommand != undefined) {
            foundCommand.function(args)
        }else{
            console.error(this,`Cannot run ${foundCommand.function}`);
        }
    }
}