const _ = require("lodash");
const { commandOutputContainer } = require("../../bash.config");
const { error } = require("../../errors");
const icons = require("../../icons");
let allFolders = require("./folders");


/**
 * The current folder in the allFolders array
 */
let currentFolder = allFolders[0];

let history = [];

// index will be used to track history.
let index = -1;

/**
 * Used to change through directories.
 * @param {string} command The folder in the current directory to change into.
 */

function cd(command) {

  if (command.length >= 1) {
    let folderName;

    if (Array.isArray(command)) {
      folderName = _.join(command, " ");
    } else {
      folderName = command;
    }

    if (folderName === "..") {
      // If the user typed `..` after `cd`

      //check weather index is less than -1.
      if (index <= -1) {
        index = -1;
      } else {
        // set the current folder to the previous folder
        currentFolder = history[index];
        history.splice(index);
        index--;
      }
      // Some debug code.
      // console.log('current folder :',currentFolder)
      // console.log('history', history)
      // console.log('index', index)

    } else {
      // Find a sub folder with a name that matches
      // with the folder name specified by the user.
      let match = _.find(currentFolder.subfolders, { name: folderName });

      // If a match was found,
      // set the current folder to the found match.
      if (match != undefined) {
        let removed = _.remove(history, (folder) => {
          return folder.name === currentFolder.name;
        });
        history.push(currentFolder);
        index++;
        currentFolder = match;

        //console.log('current folder :',currentFolder)
        //console.log('history', history)
      } // Match was not found,
      else {
        error(`<b>${folderName}</b> was no where to be found 😟 `);
      }
    }
  }else{
      error('Folder to change into was not provided.😟')
  }
}

/**
 * Gets the current location in the file system
 * @returns {string} The current location in the file system.
 */
function printPath() {
  let path = [];

  history.forEach((folder) => {
    path.push(folder.name + "/");
  });
  path.push(currentFolder.name);

  return _.join(path, "");
}

/**
 * Creates a new folder with the specified name in the current directory.
 * @param {string} command The folder to create.
 */
function mkdir(command) {
  if (command.length >= 1) {
    // user provided a folder name
    let folderName;

    if (Array.isArray(command)) {
      folderName = _.join(command, " ");
    } else {
      folderName = command;
    }

    let newFolder = {
      name: folderName,
      subfolders: [],
      files: [],
    };

    currentFolder.subfolders.push(newFolder);
    commandOutputContainer.innerHTML += `<p>Created <b>✨${folderName}✨</b> directory.</p>`;
  } else {
    //user did not provide folder name
    error(`Directory name was <b>not</b> provided. ☹`);
  }
}

/**
 * Returns all the contents inside the current directory in HTML list.
 */
function ls(command) {
  if (command.length < 1) {
    // make sure the user only wrote `ls` keyword

    // check if the current folder
    // has any subfolders or files
    if (currentFolder.subfolders.length > 0 || currentFolder.files.length > 0) {
      // create a list `ul` element
      let folderList = document.createElement("ul");
      folderList.setAttribute("class", "content-list");

      currentFolder.subfolders.forEach((folder) => {
        // for each folder inside the current folder

        // create a list item `li`
        let listItem = document.createElement("li");

        let folderIcon = _.find(icons, { name: "folder-icon" });

        // intert the folder name into the list item `li`
        listItem.innerHTML = `${folderIcon.svgPath}`;
        listItem.innerHTML += folder.name;

        //append list item to the folderList
        folderList.appendChild(listItem);

        //append folderList into the commandOutputContainer element.
        commandOutputContainer.appendChild(folderList);
      });

      currentFolder.files.forEach((file) => {
        // for each file inside the current folder

        // create a list item `li`
        let listItem = document.createElement("li");

        let fileIcon = _.find(icons, { name: "file-icon" });

        // intert the file name into the list item `li`
        listItem.innerHTML = `${fileIcon.svgPath}`;
        listItem.innerHTML += file.name;

        //append list item to the folderList
        folderList.appendChild(listItem);

        //append folderList into the commandOutputContainer element.
        commandOutputContainer.appendChild(folderList);
      });
    } else {
      error(`No content inside the current directory. ☹`);
    }
  } else {
    // the user wrote more than the `ls` keyword
    error(`That command does not exist.☹`);
  }
}

/**
 * Removes a file with the specified name from the current directory.
 * @param {string} fileName The file to remove.
 */
function rm(fileName) {
  if (fileName.length >= 1) {
    let name;

    if (Array.isArray(fileName)) {
      name = _.join(fileName, " ");
    } else {
      name = fileName;
    }

    //find a file with the name specified by the user
    let matched = _.find(currentFolder.files, { name: name });

    // if such file was found, remove it
    if (matched != undefined) {
      _.remove(currentFolder.files, (file) => file.name === matched.name);

      commandOutputContainer.innerHTML += `
                    <p> Successfully deleted <b>${name}</b> file. 🚽</p>
                `;
    } else {
      error(`<b>${name}</b> file was not found.😟`);
    }
  } else {
    error(`File to remove was not provided.😟`);
  }
}

/**
 * Removes the folder with the specified name in the current directory.
 * @param {string} name The name of the folder to be removed.
 */
function rmdir(name) {
  if (name.length >= 1) {
    // user provided a folder name

    let folderName;

    if (Array.isArray(name)) {
      folderName = _.join(name, " ");
    }

    // find a folder with the name specified by the user
    let folderMatch = _.find(currentFolder.subfolders, { name: folderName });

    // If such folder is found, remove it
    if (folderMatch != undefined) {
      _.remove(
        currentFolder.subfolders,
        (folder) => folder.name === folderMatch.name
      );
      commandOutputContainer.innerHTML += `
                <p> successfully deleted <b>${folderMatch.name}</b> folder. 🚽</p>
            `;
    } else {
      // match was not found
      error(`<b>${folderName}</b> folder does was not found. 😕`);
    }
  } else {
    error(`Folder to remove was not provided.😟`);
  }
}

/**
 * Creates a new file with the specified name in the current directory.
 * @param {string} name The file to create.
 */
function touch(name) {
  if (name.length >= 1) {
    //check user provided a file name

    let fileName;

    if (Array.isArray(name)) {
      fileName = _.join(name, " ");
    } else {
      fileName = name;
    }

    let newFile = {
      name: fileName,
    };

    currentFolder.files.push(newFile);
    commandOutputContainer.innerHTML += `
        <p>Created <b>✨${fileName}✨</b> file.</p>
        `;
  } else {
    // user only wrote `touch` keyword.
    error(`File to create was not provided.😟`);
  }
}

module.exports = {
  cd,
  mkdir,
  touch,
  ls,
  rm,
  rmdir,
  printPath,
};
