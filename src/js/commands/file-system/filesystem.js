
const _ = require('lodash')


let allFolders = require('./folders')

let cmd = document.getElementById('cmdEnvironment')

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
            cmd.innerHTML += `<p><b>${folderName}</b> was no where to be found ¯\_(ツ)_/¯</p>`
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
        cmd.innerHTML += `<p>Created <b>✨${folderName}✨</b> directory.</p>`

    }else{//user did not provide folder name
        cmd.innerHTML += `
            <p>Directory name was <b>not</b> provided. ☹</p>
            <p> Try <b> mkdir my directory</b></p>
            `
    }

}



function dir(command){

    if (command.length === 1){// make sure the user only wrote `dir` keyword

        if(currentFolder.subfolders.length > 0){// check if sub folders exist
            // create a list `ul` element
            let folderList = document.createElement('ul')

            currentFolder.subfolders.forEach((folder)=>{// for each folder inside the current folder

                // create a list item `li`
                let listItem = document.createElement('li')

                // intert the folder name into the list item `li`
                listItem.innerHTML = folder.name

                //append list item to the folderList
                folderList.appendChild(listItem)

                //append folderList into the cmd element.
                cmd.appendChild(folderList)
            })
        }else{
            cmd.innerHTML += `
            <p>No content inside the current directory. ☹</p>
            <p> Try <b> mkdir my directory</b> to create one.</p>
            `
        }
        

    }else{// the user wrote more than the `dir` keyword
        cmd.innerHTML += `
        <span> <i class="fas fa-angle-right angle"></i>${_.join(command, ' ')}</span>
        <p>Command doesn't exist yet!!</p>
        `
    }
   
}

function rmdir(command){
    if(command.length > 1){// check if the user wrote more after the `rmdir` keyword
        
        // set folderName to the words after the `del` keyword
        let folderName = _.join(command.slice(1, maxNameSize), ' ')

        // find a folder with the name specified by the user (folderName)
        let match = _.find(currentFolder.subfolders,{name:folderName})

        // If such folder is found, remove it
        if (match != undefined) {
            let removed = _.remove(currentFolder.subfolders, (folder)=>{
                return folder.name === match.name
            })
            cmd.innerHTML += `
                <p> successfully deleted <b>${folderName}</b> directory. 🚽</p>
            `
            console.log(removed)
        }else{// match was not found
            cmd.innerHTML += `
                <p><b>${folderName}</b> directory does not exist. 😕</p>
                <p>Try the command <b>dir</b> to see a list of existing directories and files in the current derectory.</b></p>
                `
        }

    }
}


module.exports = {
    cd,
    mkdir,
    dir,
    rmdir,
    printPath
}