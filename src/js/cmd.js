

const _ = require('lodash')

const allCommands = require('./commands.config')

const fileSystem = require('./commands/file-system/filesystem')

let version = 0.0

let cmdElement = document.getElementById('cmdEnvironment');

// Create the dollar element 
let dollar = document.createElement('i')
dollar.setAttribute('class', 'fas fa-dollar-sign')



// Create input for the user
let commandInput = document.createElement('input')
commandInput.setAttribute('autofocus', true)



// Create the container for the input and the dollar element
let commandInputContainer = document.createElement('span')
commandInputContainer.setAttribute('class', 'command-input-container')



module.exports = function cmd(){
    
    let cmdInfo = {
        title : 'Web based Command Line',
        version : version,
        repoLink:'https://github.com/anas2479/command-line-school'
    }


    // Append the dollar and input elements to the container
    commandInputContainer.appendChild(dollar)
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


    // If the user pressed a key on the keyboard....
    commandInput.addEventListener('keydown', function(event){

        //... and that key is the Enter key...
        if (event.key === 'Enter'){

            //...convert whatever thay wrote into an array of words.
            let input = _.words(commandInput.value, /[^ ]+/g)

            // If that array is empty (user din't write anything)....
            if (input.length  === 0){
                //...add a line-break to the cmdElement (the window).
                cmdElement.innerHTML += `<br>`

            }else{// else (if the user wrote something)....

                // if there is a command with a name that matches the user input...
                if (allCommands.find((command)=> command.name === input[0])){
                    //...find that command....
                    let command = _.find(allCommands, {name:input[0]})
                    command.function(input)
                }else{
                    cmdElement.innerHTML += `
                    <span> <i class="fas fa-dollar-sign"></i>${_.join(input, ' ')}</span>
                    <p>Command doesn't exist yet!!</p>
                    `
                }
            }
            
            // print the path of the current directory
            cmdElement.innerHTML += `<p>${fileSystem.printPath()}</p>`
        
            // reset the value of the input to none.
            commandInput.value = ''
            // re-add that input to the window
            cmdElement.appendChild(commandInputContainer)
            // set it on focus
            commandInput.focus()

            
            
        }
    })





}