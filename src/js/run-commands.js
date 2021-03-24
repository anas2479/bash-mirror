/*
* Import the array of objects representing the commands from config_commands
*/
const commands = require('./commands/config_commands')






let cmd = document.getElementById('cmdEnvironment');


module.exports = function runCommand(userInput){
    
    commands.find(function(command){
        
        if (userInput === command.command){
            command.function(userInput); 
        }
        //  else{
        //     cmd.innerHTML += `
        //       <span> <i class="fas fa-angle-right angle"></i>${userInput}</span>
        //       <p>Command doesn't exist yet!!</p>
        //       `
        // }
    })

    
}