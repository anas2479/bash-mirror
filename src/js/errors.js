const { commandOutputContainer } = require("./bash.config");




/**
 * Displays error in the Bash element.
 * @function
 * @param {String} massage 
 * The massage you want to display. 
 * It will be inserted inside a p element.
 */

function error(massage){
    commandOutputContainer.innerHTML += `
        <p class="bash-mirror-error">${massage}</p>
    `
}





module.exports = {
    error
}