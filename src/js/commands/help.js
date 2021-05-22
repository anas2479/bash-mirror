const OutPut = require('../command-output')
const commands = require('./commands.json')



module.exports = function help(){
    
    
    commands.forEach((command)=>{
        new OutPut(`
        <p> <b>${command.name}</b> &nbsp; &nbsp; &nbsp; ${command.useCase}</p>
`)
       
    })
    
}