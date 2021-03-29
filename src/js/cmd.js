const help = require('./commands/help_command')

const _ = require('lodash')

//commands 
const runCommand = require('./run-commands')

let version = 0.1

let cmdElement = document.getElementById('cmdEnvironment');

// Create the angle element 
let angle = document.createElement('i')
angle.setAttribute('class', 'fas fa-angle-right angle')



// Create input for the user
let commandInput = document.createElement('input')
commandInput.setAttribute('autofocus', true)



// Create the container for the input and the angle element
let commandInputContainer = document.createElement('span')
commandInputContainer.setAttribute('class', 'command-input-container')



module.exports = function cmd(){
    
    let cmdInfo = {
        title : 'Web based Command Line',
        version : version,
        repoLink:'https://github.com/anas2479/command-line-school'
    }


    // Append the angle and input elements to the container
    commandInputContainer.appendChild(angle)
    commandInputContainer.appendChild(commandInput)
    

    cmdElement.innerHTML = `

        <div class="info"> 
            <p>${cmdInfo.title}</p>
            <p>Version ${cmdInfo.version}</p>
            <a href="${cmdInfo.repoLink}" style="color:white;"><i class="fab fa-github-alt"></i></a>
        </div>
    `


    // Append the inputContainer to the cmd
    cmdElement.appendChild(commandInputContainer)


    // event listener to bring the input into focus
    cmdElement.addEventListener('click', ()=>{
        cmdElement.lastChild.lastChild.focus()
    })


    // event listener for when the user enters a command
    commandInput.addEventListener('keydown', function(event){

        if (event.key === 'Enter'){

            let input = _.words(commandInput.value)


            console.log(input)
            if (input.length  === 0){
                cmdElement.innerHTML += `<br>`
            }else{
                runCommand(input)
            }
        
            commandInput.value = ''
            cmdElement.appendChild(commandInputContainer)
            commandInput.focus()

            
            
        }
    })





}