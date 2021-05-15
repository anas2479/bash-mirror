const { commandOutputContainer } = require("./bash.config");


/**
 * Creates a new bash output
 * @param {any} output The output content you want displayed.
 */

function outPut(output){

    commandOutputContainer.innerHTML += `${output}`
}



module.exports = outPut