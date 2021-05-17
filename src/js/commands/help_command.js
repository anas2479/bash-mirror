
const { commandOutputContainer } = require('../bash.config')
const { error } = require('../errors')
const commands = require('./commands.json')



module.exports = function help(userInput){
    
    
    if(userInput.length >= 1){// if the user wrote more than `help`
        error("That command does not exist.☹")

    }  else{// if the user only wrote `help`
        commands.forEach((command)=>{
            commandOutputContainer.innerHTML += `
                 <p> <b>${command.name}</b> &nbsp ----> &nbsp <i>${command.useCase}</i></p>
            `
         })
    }
    
}