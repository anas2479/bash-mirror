const _ = require("lodash");
const { contentWrap } = require("./bashCofig");
const CommandLine = require("./command-line");
const OutPut = require("./command-output");
const allCommands = require("./commands.config");
const { error } = require("./errors");
const { printPath } = require("./Filesystem");
const NewCommand = require("./new-command");
const RunCommands = require("./run-commands");



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

        this.name = 'Bash'
        /* Check if the developer provided a valid target
        --------------------*/
        if (target instanceof Element) {
            this.element = target;
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



        this.contentWrap = contentWrap;

        let FSLocation = `<p class="current-path">${printPath()}/</p>`
        this.contentWrap.innerHTML = `${FSLocation}`

        this.commandLine = new CommandLine(this.commandLineSign);

        this.contentWrap.appendChild(this.commandLine.element);

        this.element.appendChild(contentWrap);


        this.commands = allCommands

        this.commandLine.input.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {

                let userInput = _.words(this.commandLine.input.value,/[^ ]+/g);
                this.commandLine.element.remove();

                /*If the user wrote nothing
                ---------------------*/
                if (userInput.length === 0) {

                    new OutPut(``);

                } else {
                    console.log(this.name +' input:', userInput);
                    new OutPut(`
                    <div class="user-input">
                        <span>${options.sign
                        }</span>  <span class="command-keyword">${userInput[0]
                        }</span>
                        <span>${_.join(userInput.slice(1), " ")}</span>
                    </div>
                    `);

                    let findCommand = this.commands.find(
                        (command) => command.name === userInput[0]
                    );

                    if (findCommand != undefined) {

                        let args = userInput.slice(1)

                        if (findCommand.args === 0 & args.length >= 1) {
                            error(`<b>${findCommand.name}</b> does not accept arguments.`)
                        } else {
                            findCommand.function(args);
                            console.log(`The arguments '${args}' were fed into the '${findCommand.name}' command.`);
                        }

                    } else {
                        error(`Unknown command ☹`);
                    }
                }
                new OutPut(`<p class="current-path">${printPath()}/</p>`)
                this.commandLine.input.value = "";
                this.contentWrap.appendChild(this.commandLine.element);
                this.commandLine.input.focus();
            }
        });
    }


    /**
     * Creates a new Bash-Mirror command.
     * @param {string} cName Command name
     * @param {Function} cFunction The function to call.
     * @param {string} cDescription The command description.
     * @param {number} cArgs The number of arguments command accepts. Default is 0
     */
    newCommand(cName, cFunction, cDescription, cArgs) {
        let newCommd = new NewCommand(cName, cFunction, cDescription, cArgs)
        this.commands.push(newCommd)
        
    }



    /**
     * Creates a new Bash-Mirror output.
     * @param {string} content For HTML, use template literals
     */
    outPut(content) {
        new OutPut(`${this.commandLineSign} ${content}`);
        this.contentWrap.appendChild(this.commandLine.element);
        this.commandLine.input.focus();
    }



    /**
     * Creates a new Bash-Mirror error
     * @param {string} content For HTML, use template literals
     */
    error(content) {
        error(`${this.commandLineSign} ${content}`);
        this.contentWrap.appendChild(this.commandLine.element);
        this.commandLine.input.focus();
    }


    /**
     * Runs a Bash-Mirror command.
     * @param {string} name The `name` of the command you want to run.
     * @param {array} args An array of arguments to feed the command's function.
     */
    runCommand(name, args){
       new RunCommands(name, args)
       this.contentWrap.appendChild(this.commandLine.element);
    }
    
};
