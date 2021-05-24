// import all the commands

const help = require('./commands/help');
const clear_command = require('./commands/clear');
const fileSystem = require('./Filesystem');





module.exports = [
    {
        name:"help",
        function:help,
        args:0,
        description: `Lists all the existing commands. Used when you need help.⛑`
    },

     {
         name:"clear",
         function:clear_command,
         args:0,
         description:`Clears everything on the screen. Used when you want to start fresh.✨`
     },

    {
        name:'cd',
        function:fileSystem.cd,
        args:[1],
        description:'Used to move though directories. ⏯'

    },

    {
        name:"mkdir",
        args:[1],
        function:fileSystem.mkdir,
        description:'Creates a new directory.📁'
    },


    {
        name:"rmdir",
        args:[1],
        function:fileSystem.rmdir,
        description:'Used to remove a directory. 🗑'
    },

    {
        name:"rm",
        args:[1],
        function:fileSystem.rm,
        description:'Used to remove a file. 🗑'
    },

    {
        name:"ls",
        args:[0],
        function:fileSystem.ls,
        description:'Lists all the content in the current directory.📃'
    },

    {
        name:"touch",
        args:[1],
        function:fileSystem.touch,
        description:'Creates a new file.🖨'
    }
    
]