const { contentContainer } = require("../cmd.config")



module.exports = function clear(userInput){

    
    
    
    
    contentContainer.innerHTML = `
    <span class="command-input-container">
        <i class="fas fa-angle-right angle" aria-hidden="true"></i>
        <input autofocus="true">
    </span>
    `

    
}