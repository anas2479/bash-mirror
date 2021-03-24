

module.exports = function help(userInput){
    
    let cmd = document.getElementById('cmdEnvironment');

    cmd.innerHTML += `
    <span>
    <i class="fas fa-angle-right" aria-hidden="true"></i>${userInput}</span>
    <ul>
       <li>Help :  Used when you need help or a command doesn't work.⛑</li>

       <li>Clear:  Used when you want to clear the windo.🧹</li>

       <li>Test:   Test command for dev purposes.👩‍💻</li>
    </ul>
    `
  
    
}