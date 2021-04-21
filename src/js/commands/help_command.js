
const { commandOutputContainer } = require('../cmd.config')
const commands = require('./commands.json')



module.exports = function help(userInput){
    
    
    
    
    if(userInput.length > 1){// if the user wrote more than `help`
        commandOutputContainer.innerHTML += `
        <span> <i class="fas fa-angle-right angle"></i>${_.join(userInput, ' ')}</span>
        <p>Command doesn't exist yet!!</p>
        `
    }  else{// if the user only wrote `help`
        commands.forEach((command)=>{
            commandOutputContainer.innerHTML += `
                 <p> <b>${command.name}</b> &nbsp ----> &nbsp <i>${command.useCase}</i></p>
            `
         })
    }
    
}