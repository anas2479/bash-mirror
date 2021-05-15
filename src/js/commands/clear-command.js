const { contentContainer } = require("../bash.config")



module.exports = function clear(userInput){
    contentContainer.innerHTML = `
    <span class="command-input-container">
        <input autofocus="true">
    </span>
    `

    
}