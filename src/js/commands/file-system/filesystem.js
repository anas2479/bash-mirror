
const _ = require('lodash')
const { commandOutputContainer } = require('../../cmd.config')
let allFolders = require('./folders')




// the max words a folder name or file name can have
let maxNameSize = 100

// Set the current folder to the Root folder.
let currentFolder = allFolders[0]

// history of folders you changed into (cd test folder)
// We'll use this array to constract a Breadcrumb
let history = []

// index will be used to track history.
let index = -1


function cd(command){

    // Extract the folder name from the command written by the user
    let folderName = _.join(command.slice(1, maxNameSize), ' ')
    
    
    if (folderName === '..'){// If the user typed `..` after `cd`

        //check weather index is less than -1.
        if(index <= -1){
            index = -1
        }else{
            // set the current folder to the previous folder
            currentFolder = history[index]
            history.splice(index)
            index --
        }
        

        // console.log('current folder :',currentFolder)
        // console.log('history', history)
        // console.log('index', index)
        
    }else{

        // Find a sub folder with a name that matches
        // with the folder name specified by the user.
        let match  = _.find(currentFolder.subfolders,{name:folderName})

        // If a match was found, 
        // set the current folder to the found match.
        if(match != undefined){

            let removed = _.remove(history, (folder)=>{
                return folder.name === currentFolder.name
            })
            history.push(currentFolder)
            index ++
            currentFolder = match 

             //console.log('current folder :',currentFolder)
             //console.log('history', history)

        }// Match was not found,
        else{
            commandOutputContainer.innerHTML += `<p><b>${folderName}</b> was no where to be found ¯\_(ツ)_/¯</p>`
        }

    }


    
    
}


function printPath(){
    let path = []

    history.forEach((folder)=>{
        path.push(folder.name + '/')
    })
    path.push(currentFolder.name)

    return _.join(path,'')
}

function mkdir(command){

    if(command.length > 1){ // user provided folder name --> command = ['mkdir', 'folder name',]
        let folderName = _.join(command.slice(1, maxNameSize), ' ')

        let newFolder = {
            name: folderName,
            subfolders:[],
            files:[]
        }
    
        currentFolder.subfolders.push(newFolder)
        commandOutputContainer.innerHTML += `<p>Created <b>✨${folderName}✨</b> directory.</p>`

    }else{//user did not provide folder name
        commandOutputContainer.innerHTML += `
            <p>Directory name was <b>not</b> provided. ☹</p>
            <p> Try <b> mkdir my directory</b></p>
            `
    }

}



function ls(command){

    if (command.length === 1){// make sure the user only wrote `ls` keyword

        // check if the current folder
        // has any subfolders or files
        if(currentFolder.subfolders.length > 0 || currentFolder.files.length > 0 ){

            // create an icon that will be next to every folder on the list
            let folderIcon = document.createElement('img')
            folderIcon.src = 'imgs/folder.svg'

            // create a list `ul` element
            let folderList = document.createElement('ul')



            currentFolder.subfolders.forEach((folder)=>{// for each folder inside the current folder

                // create a list item `li`
                let listItem = document.createElement('li')

                let folderIcon = document.createElement('img')
                folderIcon.src = 'imgs/folder.svg'


                // intert the folder name into the list item `li`
                listItem.appendChild(folderIcon)
                listItem.innerHTML += folder.name

                //append list item to the folderList
                folderList.appendChild(listItem)

                //append folderList into the commandOutputContainer element.
                commandOutputContainer.appendChild(folderList)
            })


            currentFolder.files.forEach((file)=>{// for each file inside the current folder

                // create a list item `li`
                let listItem = document.createElement('li')

                let fileIcon = document.createElement('img')
                fileIcon.src = 'imgs/file-text.svg'

                // intert the file name into the list item `li`
                listItem.appendChild(fileIcon)
                listItem.innerHTML += file.name

                //append list item to the folderList
                folderList.appendChild(listItem)

                //append folderList into the commandOutputContainer element.
                commandOutputContainer.appendChild(folderList)
            })

        }else{
            commandOutputContainer.innerHTML += `
            <p>No content inside the current directory. ☹</p>
            <p> Try <b> mkdir my directory</b> to create one.</p>
            `
        }

    }else{// the user wrote more than the `ls` keyword
        commandOutputContainer.innerHTML += `
        <span> <i class="fas fa-angle-right angle"></i>${_.join(command, ' ')}</span>
        <p>Command doesn't exist yet!!</p>
        `
    }
   
}

function rm(command){

    // check if the user wrote more after the `rmdir`/`rm` keywords
    if(command.length > 1){
        
        // set name to the words after the `del` keyword
        let name = _.join(command.slice(1, maxNameSize), ' ')

        
        // if the user wrote `rm` (they wanted to delete a file)
        if(command[0] === 'rm'){
            
            //find a file with the name specified by the user
            let fileMatch =  _.find(currentFolder.files,{name:name})

            // if such file was found, remove it
            if(fileMatch != undefined){
                let removed = _.remove(currentFolder.files, (file)=>{
                    return file.name === file.name
                })
                commandOutputContainer.innerHTML += `
                    <p> successfully deleted <b>${name}</b> file. 🚽</p>
                `
            }else{
                commandOutputContainer.innerHTML += `
                <p>no such <b>file</b> was found.</p>
                <p>if you wanted to delete a folder instead, use <b>rmdir</b></p>
                `
            }


        }

        
        // If the user wrote `rmdir` (they want to delete a directory)
        if (command[0] === 'rmdir'){

            // find a folder with the name specified by the user (name)
            let folderMatch = _.find(currentFolder.subfolders,{name:name})

            // If such folder is found, remove it
            if (folderMatch != undefined) {
                let removed = _.remove(currentFolder.subfolders, (folder)=>{
                    return folder.name === folderMatch.name
                })
                commandOutputContainer.innerHTML += `
                    <p> successfully deleted <b>${name}</b> directory. 🚽</p>
                `
                console.log(removed)
            }else{// match was not found
                commandOutputContainer.innerHTML += `
                    <p><b>${name}</b> directory does not exist. 😕</p>
                    <p>Try the command <b>dir</b> to see a list of existing directories and files in the current derectory.</b></p>
                    `
            }


        }

    }
}


function touch(command){

    if(command.length > 1){//check user provided a file name

        // set fileName to the words after the `touch` keyword
        let fileName = _.join(command.slice(1, maxNameSize), ' ')

        let newFile = {
            name:fileName,

        }

        currentFolder.files.push(newFile)
        commandOutputContainer.innerHTML += `
        <p>Created <b>✨${fileName}✨</b> file.</p>
        `

    }else{// user only wrote `touch` keyword.
        commandOutputContainer.innerHTML += `
        <p>No file name was provided 😟</p>
        `
    }
    
}

module.exports = {
    cd,
    mkdir,
    touch,
    ls,
    rm,
    printPath
}