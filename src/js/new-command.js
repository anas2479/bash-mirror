const commandsInfo = require('./commands/commands.json')
const allCommands = require('./commands.config')
const _ = require('lodash')



module.exports = class NewCommand{
    /**
     * 
     * @param {string} cName Command name
     * @param {Function} cFunction The function to invoke.
     * @param {string} cDescription The command description.
     * @param {number} cArgs The number of arguments command accepts. Default is 0
     */
    constructor(cName, cFunction, cDescription, cArgs) {




        let newCommand = {}

        if(cName != undefined){

            let check = _.find(allCommands,{name:cName})

            if(check === undefined){
                newCommand.name = cName

                
                if(cFunction != undefined){
                    newCommand.function = cFunction
                }

                if (cDescription != undefined) {
                    newCommand.description = cDescription
                    commandsInfo.push({name:cName, useCase:cDescription})
        
                }

                if (cArgs != undefined) {
                    newCommand.args = cArgs
                }else{
                    newCommand.args = 0
                }

                return newCommand

            }else{
                console.error(this,`Command with same name already exist.`);
                console.log(allCommands);
            }
            
        }else{
            console.log(this, `Cannot get '${cName}' name of new command.`);
        }

        
        
    }

}