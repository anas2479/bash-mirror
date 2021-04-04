
const _ = require('lodash')


let allFolders = []



let cmd = document.getElementById('cmdEnvironment')
module.exports = function fileSystem(command){

    
    if (command[0] === 'mkdir'){// Check if the first word is `mkdir`.
        if (command.length > 1){// Then check if there is more after `mkdir`.

            // set newFolderName to the words after the `mkdir` command
            let newFolderName = _.join(command.slice(1, 100), ' ')
            allFolders.push({ // push it to the allFolders array as a new object    
                name: newFolderName,
                subfolders:[],
                files:[]
            })
            cmd.innerHTML += `<p>Created <b>${newFolderName}</b> directory.🎉</p>`
            console.log(allFolders)
        }else{// if the user only entered `mkdir`, then ask them to provide a dir name.
            cmd.innerHTML += `
            <p>Directory name was <b>not</b> provided. ☹</p>
            <p> Try <b> mkdir my directory</b></p>
            `
        }
        
    }

    else if ( command[0] === 'dir'){ // if the firt word is dir command
        
        if ( command.length > 1){// if the user wrote something after the `dir` word
            cmd.innerHTML += `
            <span> <i class="fas fa-angle-right angle"></i>${_.join(command, ' ')}</span>
            <p>Command doesn't exist yet!!</p>
            `

        }else{
            if (allFolders.length != 0){// if all folders array is not empty

                // create a list `ul` element
                let folderList = document.createElement('ul')

                allFolders.forEach((folder)=>{// for each folder in allFolders array

                    // create a list item `li`
                    let listItem = document.createElement('li')

                    // intert the folder name into the list item `li`
                    listItem.innerHTML = folder.name

                    //append list item to the folderList
                    folderList.appendChild(listItem)

                    //append folderList into the cmd element.
                    cmd.appendChild(folderList)
                })

            } else{// if allFolders array is empty,
                cmd.innerHTML += `
                <p>No directories were created. ☹</p>
                <p> Try <b> mkdir my directory</b> to create one.</p>
                `
            }
        }
    }
}