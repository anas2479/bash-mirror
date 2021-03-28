/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cmd.js":
/*!***********************!*\
  !*** ./src/js/cmd.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const help = __webpack_require__(/*! ./commands/help_command */ \"./src/js/commands/help_command.js\")\r\n\r\n\r\n\r\n//commands \r\nconst runCommand = __webpack_require__(/*! ./run-commands */ \"./src/js/run-commands.js\")\r\n\r\nlet version = 0.1\r\n\r\nlet cmd = document.getElementById('cmdEnvironment');\r\n\r\n// Create the angle element \r\nlet angle = document.createElement('i')\r\nangle.setAttribute('class', 'fas fa-angle-right angle')\r\n\r\n\r\n\r\n// Create input for the user\r\nlet commandInput = document.createElement('input')\r\ncommandInput.setAttribute('autofocus', true)\r\n\r\n\r\n\r\n// Create the container for the input and the angle element\r\nlet commandInputContainer = document.createElement('span')\r\ncommandInputContainer.setAttribute('class', 'command-input-container')\r\n\r\n\r\n\r\nmodule.exports = function cmd_init(){\r\n    \r\n    let cmdInfo = {\r\n        title : 'Web based Command Line',\r\n        version : version,\r\n        repoLink:'https://github.com/anas2479/command-line-school'\r\n    }\r\n\r\n\r\n    // Append the angle and input elements to the container\r\n    commandInputContainer.appendChild(angle)\r\n    commandInputContainer.appendChild(commandInput)\r\n    \r\n\r\n    cmd.innerHTML = `\r\n\r\n        <div class=\"info\"> \r\n            <p>${cmdInfo.title}</p>\r\n            <p>Version ${cmdInfo.version}</p>\r\n            <a href=\"${cmdInfo.repoLink}\" style=\"color:white;\"><i class=\"fab fa-github-alt\"></i></a>\r\n        </div>\r\n    `\r\n\r\n\r\n    // Append the inputContainer to the cmd\r\n    cmd.appendChild(commandInputContainer)\r\n\r\n\r\n    // event listener to bring the input into focus\r\n    cmd.addEventListener('click', ()=>{\r\n        cmd.lastChild.lastChild.focus()\r\n    })\r\n\r\n\r\n    // event listener for when the user enters a command\r\n    commandInput.addEventListener('keydown', function(event){\r\n\r\n        if (event.key === 'Enter'){\r\n\r\n            let input = commandInput.value\r\n            \r\n            if (input === ''){\r\n                cmd.innerHTML += `<br>`\r\n            }else{\r\n                runCommand(input)\r\n            }\r\n        \r\n            commandInput.value = ''\r\n            cmd.appendChild(commandInputContainer)\r\n            commandInput.focus()\r\n\r\n            \r\n            \r\n        }\r\n    })\r\n\r\n\r\n\r\n\r\n\r\n}\n\n//# sourceURL=webpack://commandline-school/./src/js/cmd.js?");

/***/ }),

/***/ "./src/js/commands/clear-command.js":
/*!******************************************!*\
  !*** ./src/js/commands/clear-command.js ***!
  \******************************************/
/***/ ((module) => {

eval("\r\n\r\n\r\nmodule.exports = function clear(userInput){\r\n\r\n    let cmd = document.getElementById('cmdEnvironment');\r\n    \r\n    \r\n    \r\n    cmd.innerHTML = `\r\n    <span class=\"command-input-container\">\r\n        <i class=\"fas fa-angle-right angle\" aria-hidden=\"true\"></i>\r\n        <input autofocus=\"true\">\r\n    </span>\r\n    `\r\n\r\n    \r\n}\n\n//# sourceURL=webpack://commandline-school/./src/js/commands/clear-command.js?");

/***/ }),

/***/ "./src/js/commands/help_command.js":
/*!*****************************************!*\
  !*** ./src/js/commands/help_command.js ***!
  \*****************************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = function help(userInput){\r\n    \r\n    let cmd = document.getElementById('cmdEnvironment');\r\n\r\n    cmd.innerHTML += `\r\n    <span>\r\n    <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>${userInput}</span>\r\n    <ul>\r\n       <li>Help :  Used when you need help or a command doesn't work.⛑</li>\r\n\r\n       <li>Clear:  Used when you want to clear the windo.🧹</li>\r\n\r\n       <li>Test:   Test command for dev purposes.👩‍💻</li>\r\n    </ul>\r\n    `\r\n  \r\n    \r\n}\n\n//# sourceURL=webpack://commandline-school/./src/js/commands/help_command.js?");

/***/ }),

/***/ "./src/js/commands/test.js":
/*!*********************************!*\
  !*** ./src/js/commands/test.js ***!
  \*********************************/
/***/ ((module) => {

eval("\r\n\r\nmodule.exports = function test(userInput){\r\n\r\n    let cmd = document.getElementById('cmdEnvironment');\r\n    \r\n    cmd.innerHTML += `<span><i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>${userInput}</span>\r\n    <p> Test command is working! Everything looks good 😎</p>`\r\n\r\n    \r\n}\n\n//# sourceURL=webpack://commandline-school/./src/js/commands/test.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cmd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cmd */ \"./src/js/cmd.js\");\n/* harmony import */ var _cmd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cmd__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _run_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./run-commands */ \"./src/js/run-commands.js\");\n/* harmony import */ var _run_commands__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_run_commands__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n\r\n// Import CMD\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n_cmd__WEBPACK_IMPORTED_MODULE_0___default()()\r\n\r\n\r\n\n\n//# sourceURL=webpack://commandline-school/./src/js/index.js?");

/***/ }),

/***/ "./src/js/run-commands.js":
/*!********************************!*\
  !*** ./src/js/run-commands.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval(" // import all the commands\r\n const help_command = __webpack_require__(/*! ./commands/help_command */ \"./src/js/commands/help_command.js\");\r\n const clear_command = __webpack_require__(/*! ./commands/clear-command */ \"./src/js/commands/clear-command.js\");\r\n const test = __webpack_require__(/*! ./commands/test */ \"./src/js/commands/test.js\");\r\n\r\n\r\n\r\n\r\n\r\nlet cmd = document.getElementById('cmdEnvironment');\r\n\r\n\r\nmodule.exports = function runCommand(userInput){\r\n    \r\n    \r\n\r\n    switch (userInput){\r\n        case 'help':\r\n            help_command(userInput)\r\n            break;\r\n        case 'clear':\r\n            clear_command(userInput)\r\n            break;\r\n        case 'test':\r\n            test(userInput)\r\n            break;\r\n        \r\n        default:\r\n            cmd.innerHTML += `\r\n                 <span> <i class=\"fas fa-angle-right angle\"></i>${userInput}</span>\r\n                 <p>Command doesn't exist yet!!</p>\r\n                 `\r\n    }\r\n    \r\n}\n\n//# sourceURL=webpack://commandline-school/./src/js/run-commands.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;