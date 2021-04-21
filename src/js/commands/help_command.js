
const commands = require('./commands.json')


module.exports = function help(userInput){
    
    let cmd = document.getElementById('cmdEnvironment');
    
    
    if(userInput.length > 1){// if the user wrote more than `help`
        cmd.innerHTML += `
        <span> <i class="fas fa-angle-right angle"></i>${_.join(userInput, ' ')}</span>
        <p>Command doesn't exist yet!!</p>
        `
    }  else{// if the user only wrote `help`
        commands.forEach((command)=>{
            cmd.innerHTML += `
                 <p> <b>${command.name}</b> &nbsp ----> &nbsp <i>${command.useCase}</i></p>
            `
         })
    }
    
}