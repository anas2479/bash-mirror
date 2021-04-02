


let allFolders = []



let cmd = document.getElementById('cmdEnvironment')
module.exports = function fileSystem(command){

    if (command[0] === 'mkdir'){
        let newFolderName = _.join(command.slice(1, 100), ' ')
        allFolders.push({
            name: newFolderName,
            subfolders:[],
            files:[]
        })
        cmd.innerHTML += `<p>Created <b>${newFolderName}</b> folder.🎉</p>`
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