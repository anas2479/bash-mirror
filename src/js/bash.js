
const version = require('../../package.json').version
const _ = require('lodash');
const bashConfig = require('./bash.config');
const allCommands = require('./commands.config')
const fileSystem = require('./commands/file-system/filesystem')



let bashElement = document.getElementById('bash_mirror');


let header = document.createElement('div')
header.setAttribute('class', 'bash-mirror-header')


bashElement.appendChild(header)

let contentContainer = bashConfig.contentContainer


// Create the commandLineSign element 
let commandLineSign = document.createElement('i')
commandLineSign.innerHTML = '$'
commandLineSign.setAttribute('class', 'command-line-sign')


// Create input for the user
let commandInput = document.createElement('input')
commandInput.setAttribute('autofocus', true)


// Create the container for the input and the commandLineSign element
let commandInputContainer = document.createElement('span')
commandInputContainer.setAttribute('class', 'command-input-container')


let commandOutputContainer = bashConfig.commandOutputContainer




module.exports = function bash(){
    

    
    commandInputContainer.appendChild(commandLineSign)
    commandInputContainer.appendChild(commandInput)
    

    bashElement.appendChild(contentContainer)

    
    contentContainer.appendChild(commandInputContainer)


    contentContainer.addEventListener('click', ()=>{
        commandInput.focus()
    })


    
    commandInput.addEventListener('keydown', function(event){

       
        if (event.key === 'Enter'){

            
            let input = _.words(commandInput.value, /[^ ]+/g)



            
            if (input.length  === 0){
                
                contentContainer.innerHTML += `<br>`

            }else{
                
                
                input[0] = _.lowerFirst(input[0])
                
                contentContainer.innerHTML += `
                <div class="user-input">
                    <span>$</span>  <span class="command-keyword">${input[0]}</span>
                    <span>${_.join(input.slice(1),' ')}</span>
                </div>
                `

                
                if (allCommands.find((command)=> command.name === input[0])){
                    
                    let command = _.find(allCommands, {name:input[0]})
                    command.function(input)
                }else{
                    commandOutputContainer.innerHTML += `
                    <p>Command doesn't exist yet!!</p>
                    `
                }
            }

             
            
            contentContainer.appendChild(commandOutputContainer)
            
            
            contentContainer.innerHTML += `<p class="current-path">${fileSystem.printPath()}</p>`
        
            
            commandInput.value = ''
            commandOutputContainer.innerHTML =''
            
            contentContainer.appendChild(commandInputContainer)
            
            commandInput.focus()

            
            
        }
    })





}
