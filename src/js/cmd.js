

const _ = require('lodash');
const cmdConfig = require('./cmd.config');

const allCommands = require('./commands.config')

const fileSystem = require('./commands/file-system/filesystem')

let version = 0.0

let cmdElement = document.getElementById('cmdEnvironment');


let contentContainer = cmdConfig.contentContainer


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

let commandOutputContainer = cmdConfig.commandOutputContainer



module.exports = function cmd(){
    
    let cmdInfo = {
        title : 'Web based Command Line',
        version : version,
        repoLink:'https://github.com/anas2479/command-line-school'
    }


    // Append the commandLineSign and input elements to the container
    commandInputContainer.appendChild(commandLineSign)
    commandInputContainer.appendChild(commandInput)
    

    contentContainer.innerHTML = `

        <div class="info"> 
            <p>${cmdInfo.title}</p>
            <p>Version ${cmdInfo.version}</p>
            <a href="${cmdInfo.repoLink}" style="color:white;"><i class="fab fa-github-alt"></i></a>
        </div>
    `

    cmdElement.appendChild(contentContainer)

    // Append the inputContainer to the cmd
    contentContainer.appendChild(commandInputContainer)


    // event listener to bring the input into focus
    contentContainer.addEventListener('click', ()=>{
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
                contentContainer.innerHTML += `<br>`

            }else{// else (if the user wrote something)....
                

                contentContainer.innerHTML += `
                <div class="user-input">
                    <span>$</span>  <span class="command-keyword">${input[0]}</span>
                    <span>${_.join(input.slice(1),' ')}</span>
                </div>
                `

                // if there is a command with a name that matches the user input...
                if (allCommands.find((command)=> command.name === input[0])){
                    //...find that command....
                    let command = _.find(allCommands, {name:input[0]})
                    command.function(input)
                }else{
                    commandOutputContainer.innerHTML += `
                    <p>Command doesn't exist yet!!</p>
                    `
                }
            }

             
            
            contentContainer.appendChild(commandOutputContainer)
            
            // print the path of the current directory
            contentContainer.innerHTML += `<p class="current-path">${fileSystem.printPath()}</p>`
        
            // reset the value of the input to none.
            commandInput.value = ''
            commandOutputContainer.innerHTML =''
            // re-add that input to the window
            contentContainer.appendChild(commandInputContainer)
            // set it on focus
            commandInput.focus()

            
            
        }
    })





}