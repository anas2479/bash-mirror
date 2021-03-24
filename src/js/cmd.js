const help = require('./commands/help_command')



//commands 
const runCommand = require('./run-commands')

let version = 0.1

let cmd = document.getElementById('cmdEnvironment');

// Create the angle element 
let angle = document.createElement('i')
angle.setAttribute('class', 'fas fa-angle-right angle')



// Create input for the user
let commandInput = document.createElement('input')
commandInput.setAttribute('autofocus', true)



// Create the container for the input and the angle element
let commandInputContainer = document.createElement('span')
commandInputContainer.setAttribute('class', 'command-input-container')



module.exports = function cmd_init(){
    
    let cmdInfo = {
        title : 'Web based Command Line',
        version : version,
        repoLink:'https://github.com/anas2479/command-line-school'
    }


    // Append the angle and input elements to the container
    commandInputContainer.appendChild(angle)
    commandInputContainer.appendChild(commandInput)
    

    cmd.innerHTML = `

        <div class="info"> 
            <p>${cmdInfo.title}</p>
            <p>Version ${cmdInfo.version}</p>
            <a href="${cmdInfo.repoLink}" style="color:white;"><i class="fab fa-github-alt"></i></a>
        </div>
    `


    // Append the inputContainer to the cmd
    cmd.appendChild(commandInputContainer)


    // event listener to bring the input into focus
    cmd.addEventListener('click', ()=>{
        cmd.lastChild.lastChild.focus()
    })


    // event listener for when the user enters a command
    commandInput.addEventListener('keydown', function(event){

        if (event.key === 'Enter'){

            let input = commandInput.value
            
            if (input === ''){
                cmd.innerHTML += `<br>`
            }else{
                runCommand(input)
            }
        
            commandInput.value = ''
            cmd.appendChild(commandInputContainer)
            commandInput.focus()

            
            
        }
    })





}