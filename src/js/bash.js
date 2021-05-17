
const version = require('../../package.json').version
const _ = require('lodash');
const bashConfig = require('./bash.config');
const {error} = require('./errors')
const allCommands = require('./commands.config')
const fileSystem = require('./commands/file-system/filesystem')



let bashElement


let header = document.createElement('div')
header.setAttribute('class', 'bash-mirror-header')




let contentContainer = bashConfig.contentContainer





// Create input for the user
let commandInput = document.createElement('input')
commandInput.setAttribute('autofocus', true)


// Create the container for the input and the commandLineSign element
let commandInputContainer = document.createElement('span')
commandInputContainer.setAttribute('class', 'command-input-container')


let commandOutputContainer = bashConfig.commandOutputContainer

/**
 * The main function that brings together everything.
 * @function
 * @param {Element} target The HTML element in which you want turn into your bash app.
 * @param {{sign:String}} options Options to further customize your bash. Things such as the command-line sign.
 */

module.exports = function bash(target, options){
    
    bashElement = target
    

    bashElement.appendChild(header)


    // Create the commandLineSign element 
    let commandLineSign = document.createElement('i')
    commandLineSign.setAttribute('class', 'command-line-sign')

    if (options === undefined){
        commandLineSign.innerHTML = `$`
    }else{
        commandLineSign.innerHTML = options.sign
    }
    

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
                    <span>${options.sign}</span>  <span class="command-keyword">${input[0]}</span>
                    <span>${_.join(input.slice(1),' ')}</span>
                </div>
                `

                let findCommand = allCommands.find((command)=> command.name === input[0])
                if (findCommand != undefined){
            
                    findCommand.function(input.slice(1))
                }else{
                    error(`Command doesn't exist yet!!`)
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
