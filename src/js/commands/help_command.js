
const commands = require('./commands.json')


module.exports = function help(userInput){
    
    let cmd = document.getElementById('cmdEnvironment');

    commands.forEach((command)=>{
       cmd.innerHTML += `
            <p> <b>${command.name}</b> &nbsp ----> &nbsp <i>${command.useCase}</i></p>
       `
    })  
    
}