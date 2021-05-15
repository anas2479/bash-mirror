// import all the commands
const fileSystem = require('./commands/file-system/filesystem')
const help_command = require('./commands/help_command');
const clear_command = require('./commands/clear-command');





module.exports = [
    {
        name:"help",
        function:help_command,
        description: 'Lists all the existing commands. Used when you need help.⛑'
    },

    {
        name:"clear",
        function:clear_command,
        description:'Clears everything on the screen. Used when you want to start fresh.✨'
    },

    {
        name:'cd',
        function:fileSystem.cd,
        description:'Used to move though directories. ⏯'

    },

    {
        name:"mkdir",
        function:fileSystem.mkdir,
        description:'Creates a new directory.📁'
    },


    {
        name:"rmdir",
        function:fileSystem.rm,
        description:'Used to remove a directory. 🗑'
    },

    {
        name:"rm",
        function:fileSystem.rm,
        description:'Used to remove a file. 🗑'
    },

    {
        name:"ls",
        function:fileSystem.ls,
        description:'Lists all the content in the current directory.📃'
    },

    {
        name:"touch",
        function:fileSystem.touch,
        description:'Creates a new file.🖨'
    }
    
]