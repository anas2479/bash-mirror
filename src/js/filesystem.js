


let allFolders = []



let cmd = document.getElementById('cmdEnvironment')
module.exports = function fileSystem(command){

    if (command[0] === 'mkdir'){
        allFolders.push({
            name:command[1],
            subfolders:[],
            files:[]
        })
        console.log(allFolders)
    }

    else if ( command[0] === 'dir'){
        if (allFolders != []){
            let folderList = document.createElement('ul')
            allFolders.forEach((folder)=>{
                let listItem = document.createElement('li')
                listItem.innerHTML = folder.name
                folderList.appendChild(listItem)
                cmd.appendChild(folderList)
            })
        }
    }
}