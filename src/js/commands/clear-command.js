


module.exports = function clear(userInput){

    let cmd = document.getElementById('cmdEnvironment');
    
    
    
    cmd.innerHTML = `
    <span class="command-input-container">
        <i class="fas fa-angle-right angle" aria-hidden="true"></i>
        <input autofocus="true">
    </span>
    `

    
}