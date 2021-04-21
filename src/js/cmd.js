
const version = require('../../package.json').version
const _ = require('lodash');
const cmdConfig = require('./cmd.config');

const allCommands = require('./commands.config')

const fileSystem = require('./commands/file-system/filesystem')



let cmdElement = document.getElementById('cmdEnvironment');


let header = document.createElement('div')
header.setAttribute('class', 'cmd_env-header')

let logo = document.createElement('img')
logo.src = "imgs/chimppen.svg"

header.appendChild(logo)
header.innerHTML += `
<span>Web Command-Line</span>`

cmdElement.appendChild(header)

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
        repoLink:'https://github.com/anas2479/web-cl'
    }


    // Append the commandLineSign and input elements to the container
    commandInputContainer.appendChild(commandLineSign)
    commandInputContainer.appendChild(commandInput)
    

    contentContainer.innerHTML = `

        <div class="info"> 
            <p>${cmdInfo.title}</p>
            <a href="${cmdInfo.repoLink}" style="color:white;">Version ${cmdInfo.version}</a>
        </div>
    `

    cmdElement.appendChild(contentContainer)

    // Append the inputContainer to the cmd
    contentContainer.appendChild(commandInputContainer)


    // event listener to bring the input into focus
    contentContainer.addEventListener('click', ()=>{
        commandInput.focus()
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