

module.exports = function test(userInput){

    let cmd = document.getElementById('cmdEnvironment');
    
    cmd.innerHTML += `<span><i class="fas fa-angle-right" aria-hidden="true"></i>${userInput}</span>
    <p> Test command is working! Everything looks good 😎</p>`

    
}