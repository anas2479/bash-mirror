const OutPut = require("./command-output");




/**
 * Outputs an error in Bash.
 * @function
 * @param {String} massage 
 * The massage you want to display. 
 * It will be inserted inside a p element.
 */

function error(massage){
    return new OutPut(
        `<p class="bash-mirror-error">${massage}</p>`
    )
}





module.exports = {
    error
}