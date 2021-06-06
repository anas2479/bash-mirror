const OutPut = require("./command-output");
const icons = require("./icons");

module.exports = class FileSystem {
  constructor(output) {
    if (output instanceof Element) {
      this.outputEl = output;
    }

    this.contents = [
      {
        name: "root",
        subfolders: [
          {
            name: "test folder",
            subfolders: [
              {
                name: "test sub",

                subfolders: [],
                files: [],
              },
            ],
            files: [],
          },

          {
            name: "Another test folder",
            subfolders: [],
            files: [],
          },
        ],
        files: [
          {
            name: "bash-mirror.😜",
          },
        ],
      },
    ];

    this.currentFolder = this.contents[0];

    this.history = [];

    this.index = -1;
  }

  /**
   * Change Directory function
   * @param {string} folder The folder in the current directory to change into.
   */
  cd(folder) {
    if (folder.length >= 1) {
      let folderName;

      if (Array.isArray(folder)) {
        folderName = _.join(folder, " ");
      } else {
        folderName = folder;
      }

      if (folderName != "..") {
        let match = _.find(this.currentFolder.subfolders, { name: folderName });

        if (match != undefined) {
          this.history.push(this.currentFolder);
          this.index++;
          this.currentFolder = match;
        } else {
          new OutPut(
            this.outputEl,
            `
              <p class="bash-mirror-error">Cannot find <b>${folderName}</b> directory. 😟</p>`
          );
        }
      } else if (folderName === "..") {
        if (this.index <= -1) {
          this.index = -1;
        } else {
          this.currentFolder = this.history[this.index];
          this.history.splice(this.index);
          this.index = this.index - 1;
        }
      }
    } else {
      new OutPut(
        this.outputEl,
        `
            <p class="bash-mirror-error">Folder to change into was not provided.😟</p>
            `
      );
    }
  }

  printPath() {
    let path = [];

    this.history.forEach((folder) => {
      path.push(folder.name + "/");
    });
    path.push(this.currentFolder.name);

    return _.join(path, "");
  }

  /**
   * Lists all the content in the current folder.
   */
  ls() {
    // check if the current folder
    // has any subfolders or files
    if (
      this.currentFolder.subfolders.length > 0 ||
      this.currentFolder.files.length > 0
    ) {
      this.currentFolder.subfolders.forEach((SubFolder) => {
        let folderIcon = _.find(icons, { name: "folder-icon" });

        new OutPut(
          this.outputEl,
          `
            <p>${folderIcon.svgPath}  &nbsp; ${SubFolder.name}</p>
            `
        );
      });

      this.currentFolder.files.forEach((file) => {
        let fileIcon = _.find(icons, { name: "file-icon" });

        new OutPut(
          this.outputEl,
          `<p>${fileIcon.svgPath} &nbsp; ${file.name}</p>
              `
        );
      });
    } else {
      new OutPut(
        this.outputEl,
        `
          <p class="bash-mirror-error">No content inside the current directory. ☹</p>
          `
      );
    }
  }

  /**
   * Creates a new folder.
   * @param {} folder The folder to create.
   */
  mkdir(folder) {
    if (folder.length >= 1) {
      let folderName;

      if (Array.isArray(folder)) {
        folderName = _.join(folder, " ");
      } else {
        folderName = folder;
      }

      let check = _.find(this.currentFolder.subfolders, { name: folderName });

      if (check === undefined) {
        let newFolder = {
          name: folderName,
          subfolders: [],
          files: [],
        };

        this.currentFolder.subfolders.push(newFolder);

        new OutPut(
          this.outputEl,
          `
                <p> 🎉 Created <b>${newFolder.name}</b> folder</p>
                `
        );
      } else {
        new OutPut(
          this.outputEl,
          `
              <p class="bash-mirror-error">Folder with the same name already exists.</p>
              `
        );
      }
    } else {
      new OutPut(
        this.outputEl,
        `
          <p class="bash-mirror-error">Folder name was not provided</p>
          `
      );
    }
  }

  /**
   * Creates a new file with the specified name in the current directory.
   * @param {string} name The file to create.
   */
  touch(name) {
    if (name.length >= 1) {
      //check user provided a file name

      let fileName;

      if (Array.isArray(name)) {
        fileName = _.join(name, " ");
      } else {
        fileName = name;
      }

      let check = _.find(this.currentFolder.files, { name: fileName });

      if (check === undefined) {
        let newFile = {
          name: fileName,
        };

        this.currentFolder.files.push(newFile);
        new OutPut(
          this.outputEl,
          `
              <p>🎉 Created <b>${fileName}</b> file.🎉 </p>
              `
        );
      } else {
        new OutPut(
          this.outputEl,
          `
            <p class="bash-mirror-error">File with same name already exists</p>
            `
        );
      }
    } else {
      new OutPut(
        this.outputEl,
        `
          <p class="bash-mirror-error">File to create was not provided.😟</p>
          `
      );
    }
  }

  rm(fileName) {
    if (fileName.length >= 1) {
      let name;

      if (Array.isArray(fileName)) {
        name = _.join(fileName, " ");
      } else {
        name = fileName;
      }

      //find a file with the name specified by the user
      let matched = _.find(this.currentFolder.files, { name: name });

      // if such file was found, remove it
      if (matched != undefined) {
        _.remove(
          this.currentFolder.files,
          (file) => file.name === matched.name
        );

        new OutPut(
          this.outputEl,
          `
          <p> Successfully deleted <b>${name}</b> file. 🚽</p>
          `
        );
      } else {
        new OutPut(
          this.outputEl,
          `
          <p class="bash-mirror-error">
          <b>${name}</b> file was not found.😟
          </p>
          `
        );
      }
    } else {
      new OutPut(
        this.outputEl,
        `
        <p class="bash-mirror-error"> File to remove was not provided.😟</p>
        `
      );
    }
  }
};
