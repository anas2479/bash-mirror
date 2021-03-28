 // import all the commands
 const help_command = require('./commands/help_command');
 const clear_command = require('./commands/clear-command');
 const test = require('./commands/test');





let cmd = document.getElementById('cmdEnvironment');


module.exports = function runCommand(userInput){
    
    

    switch (userInput){
        case 'help':
            help_command(userInput)
            break;
        case 'clear':
            clear_command(userInput)
            break;
        case 'test':
            test(userInput)
            break;
        
        default:
            cmd.innerHTML += `
                 <span> <i class="fas fa-angle-right angle"></i>${userInput}</span>
                 <p>Command doesn't exist yet!!</p>
                 `
    }
    
}