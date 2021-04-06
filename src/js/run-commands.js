
const _ = require('lodash')

const allCommands = require('./commands.config')


let cmd = document.getElementById('cmdEnvironment');


/*
*runCommand
------------
* takes userInput which is the input by the user as parameter
*/

module.exports = function runCommand(userInput){
    
    // if there is a command with a name that matches the user input...
    if (allCommands.find((command)=> command.name === userInput[0])){
        //...find that command....
        let command = _.find(allCommands, {name:userInput[0]})
        command.function(userInput)
    }else{
        cmd.innerHTML += `
        <span> <i class="fas fa-angle-right angle"></i>${_.join(userInput, ' ')}</span>
        <p>Command doesn't exist yet!!</p>
        `
    }

    
}