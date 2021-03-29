 // import all the commands
 const fileSystem = require('./filesystem')
 const help_command = require('./commands/help_command');
 const clear_command = require('./commands/clear-command');
 const test = require('./commands/test');





let cmd = document.getElementById('cmdEnvironment');


module.exports = function runCommand(userInput){
    
    

    switch (userInput[0]){
        case 'help':
            help_command(userInput[0])
            break;
        case 'clear':
            clear_command(userInput)
            break;
        case 'test':
            test(userInput)
            break;
        
        case 'mkdir':
            fileSystem(userInput);
            break

        case 'dir':
            fileSystem(userInput);
            break;
        
        default:
            cmd.innerHTML += `
                 <span> <i class="fas fa-angle-right angle"></i>${userInput}</span>
                 <p>Command doesn't exist yet!!</p>
                 `
    }
    
}