const _ = require('lodash')



module.exports = class NewCommand{
    
    /**
     * 
     * @param {{ name:string, function:function, description:string}} command 
     * @returns Bash-Mirror Command
     */
    constructor(command) {

        let newCommand = {}

        if(command.name != undefined){

            
                newCommand.name = _.toLower(command.name)

                
                if(command.function != undefined){
                    newCommand.function = command.function

                    if (command.description != undefined) {
                        newCommand.description = command.description
            
                    }
    
                    return newCommand
                }else{
                    console.error(`Cannot get ${command.name}'s function.`);
                }
            
        }else{
            console.error(`Cannot get new command's name!`);
        } 
    }

}