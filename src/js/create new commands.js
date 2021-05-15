const allCommands = require('./commands.config')
const commandsInfo = require('./commands/commands.json')
/**
 * Creates a new bash command
 * @param {{name:string, function:function, description:string}} newCommand 
 */

function addCommand(newCommand){

    if(newCommand.name === undefined){
        console.error('addCommand: name was not provided for the new command.')
    }
    else if(newCommand.function === undefined){
        console.error(`addCommand: function to run for ${newCommand.name} was not spacified`)
    }
    else{
        allCommands.push(newCommand)
        let command = {
            name: newCommand.name,
            useCase : newCommand.description
        }
        commandsInfo.push(command)
    }
    
}


module.exports = addCommand