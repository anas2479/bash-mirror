
const _ = require('lodash')
const { commandOutputContainer } = require('../../bash.config')
const { error } = require('../../errors')
const icons = require('../../icons')
let allFolders = require('./folders')




// the max words a folder name or file name can have
let maxNameSize = 100

/**
 * The current folder in the allFolders array
 */
let currentFolder = allFolders[0]


let history = []

// index will be used to track history.
let index = -1

/**
 * The function used to change through directories.
 * @param {Array} command The user input split into words.
 */

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
            error(`<b>${folderName}</b> was no where to be found 😟 `)
        }

    }


    
    
}

/**
 * 
 * @returns {string} The current location in the file system.
 */
function printPath(){
    let path = []

    history.forEach((folder)=>{
        path.push(folder.name + '/')
    })
    path.push(currentFolder.name)

    return _.join(path,'')
}



/**
 * Creates a new folder in the current directory.
 * @param {Array} command The user input split into words.
 */
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
        error(`Directory name was <b>not</b> provided. ☹`)
    }

}


/**
 * Returns all the contents inside the current directory in HTML list.
 * @param {Array} command The user input split into wards
 */
function ls(command){

    if (command.length === 1){// make sure the user only wrote `ls` keyword

        // check if the current folder
        // has any subfolders or files
        if(currentFolder.subfolders.length > 0 || currentFolder.files.length > 0 ){


            // create a list `ul` element
            let folderList = document.createElement('ul')
            folderList.setAttribute('class','content-list')


            currentFolder.subfolders.forEach((folder)=>{// for each folder inside the current folder

                // create a list item `li`
                let listItem = document.createElement('li')

                let folderIcon = _.find(icons, {name : 'folder-icon'})
                console.log(folderIcon)

                // intert the folder name into the list item `li`
                listItem.innerHTML = `${folderIcon.svgPath}`
                listItem.innerHTML += folder.name

                //append list item to the folderList
                folderList.appendChild(listItem)

                //append folderList into the commandOutputContainer element.
                commandOutputContainer.appendChild(folderList)
            })


            currentFolder.files.forEach((file)=>{// for each file inside the current folder

                // create a list item `li`
                let listItem = document.createElement('li')

                let fileIcon = _.find(icons, {name :'file-icon'})

                // intert the file name into the list item `li`
                listItem.innerHTML = `${fileIcon.svgPath}`
                listItem.innerHTML += file.name

                //append list item to the folderList
                folderList.appendChild(listItem)

                //append folderList into the commandOutputContainer element.
                commandOutputContainer.appendChild(folderList)
            })

        }else{
            error(`No content inside the current directory. ☹`)
        }

    }else{// the user wrote more than the `ls` keyword
        error(`That command does not exist.☹`)
    }
   
}


/**
 * Removes a file from the current directory.
 * @param {Array} command The user input split into words
 */
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
                error(`No such <b>file</b> was found. To delete a folder instead, use <b>rmdir</b>`)
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
                error(`<b>${name}</b> directory does not exist. 😕`)
            }


        }

    }
}

/**
 * Creates a new file in the current directory.
 * @param {Array} command The user input split into words
 */
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
        error(`No <b>file name</b> was provided 😟.`)
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