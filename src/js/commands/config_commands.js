
const help_command = require('./help_command');
const clear_command = require('./clear-command');
const test = require('./test');


module.exports =  [

    {
        name:'Help',
        command:'help',
        useCase : "Used when you need help or a command doesn't work.⛑",
        function:help_command
        
    },

    {
        name:'Clear',
        command:'clear',
        function:clear_command,
        useCase:"Used when you want to clear the windo.🧹"
    },


    {
        name:'test',
        command:'test',
        function:test,
        useCase:"Test command for dev purposes.👩‍💻"
    }


    
]