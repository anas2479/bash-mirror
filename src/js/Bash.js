const _ = require("lodash");
const CommandLine = require("./command-line");
const OutPut = require("./command-output");
const FileSystem = require('./Filesystem')
const NewCommand = require("./new-command");



/**
 * Bash-Mirror constructor.
 */
module.exports = class Bash {


    /**
     * 
     * @param {HTMLElement} target 
     * @param {{sign:string}} options 
     */
    constructor(target, options) {

        
        /* Check if the developer provided a valid target
        --------------------*/
        if (target instanceof Element) {
            this.element = target;
            this.name = target.id
        } else {
            console.error(`Bash: Cannot get a valid 'target' element.`);
        }



        /* Check if the developer provided an `options` argument
        --------------------*/
        if (options === undefined) {
            this.commandLineSign = `$`;
        } else {
            this.commandLineSign = options.sign;
        }

        
        this.contentWrap = document.createElement('div');
        this.contentWrap.setAttribute('class','bash-mirror-content-wrap')


        this.fileSystem = new FileSystem(this.contentWrap)


        let FSLocation = `<p class="current-path">${this.fileSystem.printPath()}/</p>`
        this.contentWrap.innerHTML = `${FSLocation}`

        this.commandLine = new CommandLine(this.commandLineSign);

        this.contentWrap.appendChild(this.commandLine.element);

        this.element.appendChild(this.contentWrap);


        this.commands = [
            {
                name:'help',
                function:this.help,
                description:'Lists all the commands and a description of them.'
            },
            {
                name:'clear',
                function:this.clear,
                description:'Clears everything on the screen. Used when you want to start fresh.✨',
                
            },

            {
                name:'ls',
                function:this.fileSystem.ls,
                description:'Lists all the content in the current folder.📃'
            },
            {
                name:'mkdir',
                function:this.fileSystem.mkdir,
                description:'Creates a new directory.📁'
            },
            {
                name:'touch',
                function:this.fileSystem.touch,
                description:'Creates a new file.🖨'
            },
            {
                name:'rm',
                function:this.fileSystem.rm,
                description:'Used to remove a file. 🗑'
            },

        ]
        

        this.commandLine.input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                let userInput = _.words(this.commandLine.input.value,/[^ ]+/g);
                this.commandLine.element.remove();

                /*If the user wrote nothing
                ---------------------*/
                if (userInput.length === 0) {

                    new OutPut(this.contentWrap, ``);

                    new OutPut(this.contentWrap,`<p class="current-path">${this.fileSystem.printPath()}/</p>`)

                    this.contentWrap.appendChild(this.commandLine.element);
                    this.commandLine.input.focus();
                  
                /* If the user wrote something 
                ------------------- */
                } else {

                    console.log(this.name +' input:', userInput.slice(1));
                    new OutPut(this.contentWrap, `
                    <div class="user-input">
                        <span>${options.sign
                        }</span>  <span class="command-keyword">${userInput[0]
                        }</span>
                        <span>${_.join(userInput.slice(1), " ")}</span>
                    </div>
                    `);

                    this.userInput = userInput
                    let args = userInput.slice(1)
                    this.runCommand(userInput[0],args)
                    
                }
    
                
            }

        });

        
    }




    /**
     * Creates a new Bash-Mirror command
     * @param {{ name:string, function:function, description:string}} command 
     * @returns Bash-Mirror Command
     */
    newCommand(command) {
        let newCommd = new NewCommand(command)
        this.commands.push(newCommd)
    }



    /**
     * Creates a new Bash-Mirror output.
     * @param {string} content For HTML, use template literals
     */
    outPut(content) {
        new OutPut(this.contentWrap,
            `${this.commandLineSign} ${content}`);
        this.contentWrap.appendChild(this.commandLine.element);
        this.commandLine.input.focus();
    }



    runCommand(name, args){

        new OutPut(this.contentWrap,`<p class="current-path">${this.fileSystem.printPath()}/</p>`)


        switch (name) {
            case 'help':
                this.help()
                break;
            case 'clear':
                this.clear()
                break;

            case 'ls':
                this.fileSystem.ls()
                break;

            case 'cd':
                this.fileSystem.cd(args)
                new OutPut(this.contentWrap,`<p class="current-path">${this.fileSystem.printPath()}/</p>`)
                break;

            case 'mkdir':
                this.fileSystem.mkdir(args)
                break;

            case 'touch':
                this.fileSystem.touch(args)
                break;

            case 'rm':
                this.fileSystem.rm(args)
                break;

            default:
                let foundC = _.find(this.commands,{name:name})
                if (foundC != undefined) {
                    foundC.function(args)
                }else{
                    new OutPut(this.contentWrap,`
                    <p class="bash-mirror-error">Unknown Command ☹</p>
                    `)
                    console.error(`Cannot find command.`);
                }
                break;
        }

        this.commandLine.input.value = "";
        this.contentWrap.appendChild(this.commandLine.element);
        this.commandLine.input.focus();

        
        
    }

    

    help(){
        this.commands.forEach((command)=>{
            new OutPut(this.contentWrap, `
            <p> <b>${command.name}</b> &nbsp; &nbsp; &nbsp; ${command.description}</p>
            `)  
        })  
    }


    clear(){
        this.contentWrap.innerHTML =' '
      }

};


