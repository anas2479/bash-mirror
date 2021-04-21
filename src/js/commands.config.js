// import all the commands
const fileSystem = require('./commands/file-system/filesystem')
const help_command = require('./commands/help_command');
const clear_command = require('./commands/clear-command');





module.exports = [
    {
        name:"help",
        function:help_command
    },

    {
        name:"clear",
        function:clear_command
    },

    {
        name:'cd',
        function:fileSystem.cd

    },

    {
        name:"mkdir",
        function:fileSystem.mkdir
    },


    {
        name:"rmdir",
        function:fileSystem.rm
    },

    {
        name:"rm",
        function:fileSystem.rm
    },

    {
        name:"ls",
        function:fileSystem.ls
    },

    {
        name:"touch",
        function:fileSystem.touch
    }
    
]