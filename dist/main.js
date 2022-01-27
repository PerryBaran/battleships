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

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module) => {

eval("const Gameboard = (size) => {\n    const board = createArray(size); //create 2D array to store coordinates of size x size grid\n    const checkBoard = () => board;\n\n    const placeShip = (battleShip, y, x) => {\n        if ((battleShip.isHorizontal()) &&  //check ship orientation, horizontal\n            (x + battleShip.length() <= size) && //check ship doesn't overflow border\n            (locationsFreeX(battleShip.length(), y, x, board))) {  //check all spaces are free\n                for (i = x; i < (x + battleShip.length()); i++) {\n                    board[y][i].ship = battleShip;\n                    battleShip.place();\n                }\n        } else if ((!battleShip.isHorizontal()) && //vertical\n            (y + battleShip.length() <= size) && //check ship doesn't overflow border\n            (locationsFreeY(battleShip.length(), y, x, board))) {  //check all spaces are free\n                for (i = y; i < (y + battleShip.length()); i++) {\n                    board[i][x].ship = battleShip;\n                    battleShip.place();\n                }\n            }\n        }\n\n    const receiveAttack = (y, x) => {\n        if (board[y][x].hit === false) {    //check if coordinate has been hit\n            if (board[y][x].ship === null) {    // check if coordinate doesn't contain a ship\n                board[y][x].hit = true;\n            } else {\n                board[y][x].ship.hit();\n                board[y][x].hit = true;\n            }\n        }\n    }\n\n    const checkLose = () => {\n        for (y = 0; y < size; y++) {\n            for (x = 0; x < size; x++) {\n                if (board[y][x].ship !== null && board[y][x].hit === false) { //if any position contains a ship section that has not been hit\n                    return false\n                }\n            }\n        }\n        return true;\n    }\n    return {checkBoard, placeShip, receiveAttack, checkLose}\n}\n\nfunction createArray(size) {\n    const outerArray = [];\n    for (i = 0; i < size; i++) {\n        const innerArray = [];\n        for (n = 0; n < size; n++) {\n            const object = {ship: null, hit: false};\n            innerArray.push(object);\n        } outerArray.push(innerArray)\n    }\n    return outerArray;\n}\n\nfunction locationsFreeX(length, y, x, board) {\n    for (i = x; i < (x + length); i++) {\n        if (board[y][i].ship !== null) { //if where the ship is going to be placed already contains a ship\n            return false\n        }\n    } return true\n}\n\nfunction locationsFreeY(length, y, x, board) {\n    for (i = y; i < (y + length); i++) {\n        if (board[i][x].ship !== null) {\n            return false\n        }\n    } return true\n}\n\nmodule.exports = Gameboard\n\n//# sourceURL=webpack://battleships/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n\nconst initializePage = __webpack_require__(/*! ./initialize */ \"./src/initialize.js\");\n\ninitializePage();\n\n\n\n\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/initialize.js":
/*!***************************!*\
  !*** ./src/initialize.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const reset = __webpack_require__(/*! ./resetDOM */ \"./src/resetDOM.js\");\nconst setup = __webpack_require__(/*! ./setup */ \"./src/setup.js\");\n\nconst initializePage = () => {\n    reset(content);\n\n    //create top bar\n    const topBar = document.createElement('div');\n    topBar.id = 'topbar';\n    const header = document.createElement('h1');\n    header.innerHTML = 'BATTLESHIP';\n    topBar.appendChild(header);\n    content.appendChild(topBar);\n\n    //create players\n    const info1 = createPlayer('Player 1', '#FF0000');\n    const info2 = createPlayer('Player 2', '#0000FF');\n    \n    //player 2 is computer option\n    let computer = true;\n\n    const container = document.createElement('div');\n    container.className = \"computerInput\";\n    const option = document.createElement('button');\n    option.innerHTML = 'player vs computer';\n    container.appendChild(option);\n    content.appendChild(container);\n\n    option.onclick = () => {\n        if (computer) {\n            computer = false;\n            option.innerHTML = 'player vs player'\n        } else {\n            computer = true;\n            option.innerHTML = 'player vs computer';\n        }\n    }\n   \n    //start button\n    const startWrapper = document.createElement('div');\n    startWrapper.id = 'start';\n    const start = document.createElement('button');\n    start.innerHTML = 'START';\n    startWrapper.appendChild(start);\n    content.appendChild(startWrapper);\n\n    start.addEventListener('click', () => {\n        setup(info1, info2, computer);\n    })\n}\n\nfunction createPlayer(nameValue, colorValue) {\n    const container = document.createElement('div');\n    container.className = 'player'\n    content.appendChild(container);\n\n    const name = document.createElement('input');\n    name.value = nameValue;\n    name.className = 'nameInput'\n    container.appendChild(name);\n\n    const wrapper = document.createElement('div');\n    wrapper.className = 'colorPicker'\n    const color = document.createElement('input');\n    color.type = 'color';\n    color.value = colorValue;\n\n    wrapper.style.background = color.value;\n    name.style.color = color.value;\n    \n    color.addEventListener('input', () => {\n        wrapper.style.background = color.value;\n        name.style.color = color.value;\n    });\n\n    wrapper.appendChild(color);\n    container.appendChild(wrapper);\n\n    \n    return {name: name, color: color}\n}\n    \n\n\n\nmodule.exports = initializePage;\n\n\n//# sourceURL=webpack://battleships/./src/initialize.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst ShipFactory = __webpack_require__(/*! ./shipFactory */ \"./src/shipFactory.js\");\n\nconst Player = (nameInput, colourInput, gameBoardSize) => {\n    const board = Gameboard(gameBoardSize);             //debated hardcoding gameBoardSize as 10 to reduce inputs but settled on variable as it makes it easier to test\n    const getBoard = () => board;\n    const ships = ShipFactory([5, 4, 3, 3, 2]);\n    const getShips = () => ships;\n    const name = nameInput;\n    const getName = () => name;\n    const colour = colourInput;\n    const getColour = () => colour;\n    return {getBoard, getName, getColour, getShips}\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleships/./src/player.js?");

/***/ }),

/***/ "./src/resetDOM.js":
/*!*************************!*\
  !*** ./src/resetDOM.js ***!
  \*************************/
/***/ ((module) => {

eval("const reset = (parent) => {\n    while (parent.firstChild) {\n        parent.removeChild(parent.firstChild);\n    }\n}\n\nmodule.exports = reset;\n\n//# sourceURL=webpack://battleships/./src/resetDOM.js?");

/***/ }),

/***/ "./src/setup.js":
/*!**********************!*\
  !*** ./src/setup.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst reset = __webpack_require__(/*! ./resetDOM */ \"./src/resetDOM.js\");\n\n//can't figure out a way to pass id info for mobile devices without global variables\nvar mobileShipId = null;\nvar mobilePartId = null;\n\nconst setup = (info1, info2, computer) => {\n    //create players\n    const player1 = Player(info1.name.value, info1.color.value, 10);\n    const player2 = Player(info2.name.value, info2.color.value, 10);\n\n    //DOM\n    reset(content);\n \n    const container1 = document.createElement('div');\n    container1.className = 'container';\n    content.appendChild(container1);\n    const dock = document.createElement('dock');\n    dock.className = 'harbor top';\n    container1.appendChild(dock);\n\n    displayShips(dock, player1.getShips()); //array of ship DOM elements\n\n    const container2 = document.createElement('div');\n    container2.className = 'container';\n    content.appendChild(container2);\n    const gameboard = document.createElement('div');\n    gameboard.className = 'gameboard bottom';\n    container2.appendChild(gameboard);\n\n    gameboardDOM(gameboard, player1, dock); //array of gameboard cells\n\n    //drag and drop\n   \n    \n    //on continue, if computer = false, set up page for player 2\n    //if computer = true, randomly place ships for player 2\n    //on continue, set up game loop\n};\n\n\n   \n    \n    \n    //build gameboard player 1\n    //add continue button\n    //loop through with player 2 or randomly place ships\n    //continue to next step\n\n//displays unplaced ships\nfunction displayShips(container, harbor) {\n    reset(container);\n    let partIndex = null; //var to pass part id to data transfer and datatransfer can't be set by mousedown\n    for (i = 0; i < harbor.length; i++) {\n        if (!harbor[i].placed()) { //if ship is not placed display ship\n            const ship = document.createElement('div');\n            ship.className = 'ship';\n            ship.id = i;\n            ship.draggable = true;\n            \n            container.appendChild(ship);\n            if (harbor[i].isHorizontal()) {\n                ship.style.display = 'inline-flex';\n            } else {\n                ship.style.display = 'inline-block';\n            };\n            \n            for (n = 0; n < harbor[i].length(); n++) {\n                const part = document.createElement('div');\n                part.className = 'shipPart';\n                part.dataset.index = n;\n                ship.appendChild(part);\n\n                //dekstop\n                part.addEventListener('mousedown', e => {\n                    partIndex = part.dataset.index;\n                });\n\n                //mobile\n                part.addEventListener('touchstart', () => {\n                    mobilePartId = part.dataset.index;\n                });\n            };\n\n            ship.addEventListener('click', () => {\n                harbor[ship.id].changeOrientation();\n                if (harbor[ship.id].isHorizontal()) {\n                    ship.style.display = 'inline-flex';\n                } else {\n                    ship.style.display = 'inline-block';\n                };\n            });\n\n            //desktop drag\n            ship.addEventListener('dragstart', e => {\n                e.dataTransfer.setData('shipID', ship.id);\n                e.dataTransfer.setData('partID', partIndex);\n            });\n\n            ship.addEventListener('dragend', () => {\n                displayShips(container, harbor); //reload ships\n            });\n\n            //mobile drag\n            ship.addEventListener('touchstart', () => {\n                mobileShipId = ship.id\n            });\n\n            ship.addEventListener('touchend', () => {\n                displayShips(container, harbor); //reload ships\n            });\n        };\n    };\n};\n\nfunction gameboardDOM(container, player, container2) {\n    reset(container);\n    const cells = [];\n    for (y = 0; y < player.getBoard().checkBoard().length; y++) {   \n        for (x = 0; x < player.getBoard().checkBoard()[y].length; x++) {\n            const cell = document.createElement('div');\n            cell.className = 'cell';\n            cell.dataset.y = y; //y coordinate\n            cell.dataset.x = x; //x coordinate\n            container.appendChild(cell);\n            cells.push(cell);\n\n            if (player.getBoard().checkBoard()[y][x].ship !== null) {\n                cell.style.background = 'red';\n            }\n\n            //drag and drop - desktop\n            cell.addEventListener('dragover', e => {\n                e.preventDefault();\n            });\n\n            cell.addEventListener('drop', e => {\n                e.preventDefault();\n                const shipID = e.dataTransfer.getData('shipID');\n                const partID = e.dataTransfer.getData('partID');\n\n                const ship = player.getShips()[shipID];\n                if (ship.isHorizontal()) {\n                    const y = cell.dataset.y;\n                    const x = cell.dataset.x - partID;\n                    player.getBoard().placeShip(ship, y, x);\n                } else if (!ship.isHorizontal()) {\n                    const y = cell.dataset.y - partID;\n                    const x = cell.dataset.x;\n                    player.getBoard().placeShip(ship, y, x);\n                }\n                gameboardDOM(container, player, container2); //reload board\n            });\n\n            //drag and drop mobile\n            cell.addEventListener('touchend', () => {\n                console.log('yo');\n                const shipID = mobileShipId;\n                const partID = mobilePartId;\n\n                const ship = player.getShips()[shipID];\n                if (ship.isHorizontal()) {\n                    const y = cell.dataset.y;\n                    const x = cell.dataset.x - partID;\n                    player.getBoard().placeShip(ship, y, x);\n                } else if (!ship.isHorizontal()) {\n                    const y = cell.dataset.y - partID;\n                    const x = cell.dataset.x;\n                    player.getBoard().placeShip(ship, y, x);\n                }\n                gameboardDOM(container, player, container2);\n                displayShips(container2, player.getShips());\n            });\n        };\n    };\n    return cells;\n};\n\nfunction dragStart(ship, partIndex) {\n    e.dataTransfer.setData('shipID', ship.id);\n    e.dataTransfer.setData('partID', partIndex);\n}\n\n\n\nmodule.exports = setup;\n\n//# sourceURL=webpack://battleships/./src/setup.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("const Ship = (size) => {\n    const length = () => size;\n    let health = size;\n    let sunk = false;\n    let horizontal = true;\n    const hit = () => {\n        health--;\n        if (health === 0) {\n            sunk = true;\n        }\n    }\n    const isSunk = () => sunk;\n    const isHorizontal = () => horizontal;\n    const changeOrientation = () => horizontal = (horizontal ? false : true);\n    var isPlaced = false;\n    const place = () => isPlaced = true;\n    const remove = () => isPlaced = false;\n    const placed = () => isPlaced;\n    return {length, hit, isSunk, isHorizontal, changeOrientation, place, remove, placed}\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleships/./src/ship.js?");

/***/ }),

/***/ "./src/shipFactory.js":
/*!****************************!*\
  !*** ./src/shipFactory.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n//used to create ships and store in an array\nconst ShipFactory = (array) => {            \n    const harbor = [];\n    for (i = 0; i < array.length; i++) {\n        const ship = Ship(array[i]);\n        harbor.push(ship);\n    }\n    return harbor;\n}\n\nmodule.exports = ShipFactory;\n\n//# sourceURL=webpack://battleships/./src/shipFactory.js?");

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*****************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"../../node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"../../node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n    box-sizing: border-box;\\n    margin: auto;\\n    font-family: Arial, Helvetica, sans-serif;\\n    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);\\n    overscroll-behavior: contain;\\n}\\n\\n:root{\\n    --dark-blue: rgb(1, 60, 128);\\n    --darker-blue: rgb(1, 28, 59);\\n}\\n\\n/*initial screen*/\\n#topbar {\\n    background: var(--dark-blue);\\n    height: 60px;\\n}\\n\\nh1 {\\n    color: white;\\n    position: absolute;\\n    top: 17px;\\n    left: 5px;\\n    font-size: 3rem;\\n}\\n\\n.player {\\n    border: 2px solid var(--dark-blue);\\n    border-radius: 2px;\\n    margin-top: 15%;\\n    height: fit-content;\\n    width: 380px;\\n}\\n\\n.nameInput {\\n    display: inline-block;\\n    margin: 5px;\\n    margin-bottom: 10px;\\n    font-size: 3rem;\\n    width: 300px;\\n    border-radius: 2px;\\n    border: 1px solid black;\\n}\\n\\n.colorPicker {\\n    display: inline-block;\\n    aspect-ratio: 1/1;\\n    height: 50px;\\n    border-radius: 100px;\\n    border: 2px solid black;\\n    margin: 5px;\\n    position: relative;\\n    top: 10px;\\n}\\n\\ninput[type=\\\"color\\\"] {\\n    -webkit-appearance: none;\\n    border-radius: 100px;\\n    aspect-ratio: 1/1;\\n    height: 50px;\\n    overflow: hidden;\\n    opacity: 0;\\n}\\n\\n.computerInput {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-top: 10%;\\n    width: 100%;\\n}\\n\\n.computerInput > button {\\n    display: inline-block;\\n    font-size: 2rem;\\n    background-color: none;\\n    color: var(--dark-blue);\\n    border: 2px solid var(--dark-blue);\\n    border-radius: 2px;\\n}\\n\\n#start {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-top: 10%;\\n    position: absolute;\\n    bottom: 30px;\\n    left: 0;\\n    right: 0;\\n}\\n\\n#start > button {\\n    width: 200px;\\n    height: 60px;\\n    font-size: 3rem;\\n    margin: auto;\\n    background-color: var(--dark-blue);\\n    color: white;\\n    border: 2px solid var(--darker-blue);\\n    border-radius: 2px;\\n}\\n\\n/*setup screen*/\\n.container {\\n    position: relative;\\n    width: 100vw;\\n    height: 50vh;\\n    overflow: scroll;\\n}\\n\\n.harbor.top {\\n    display: block;\\n    position:absolute; \\n    bottom:0;\\n    width: 100%;\\n    text-align: center;\\n}\\n\\n.ship {\\n    margin: 10px;\\n}\\n\\n.shipPart {\\n    border: 1px solid rgb(17, 17, 17);\\n    aspect-ratio: 1/1;\\n    height: calc(45vh / 10);\\n}\\n\\n.gameboard {\\n    display: grid;\\n    grid-template-columns: repeat(10, 1fr);\\n    aspect-ratio: 1/1;\\n    height: 200px;\\n}\\n\\n.gameboard.bottom {\\n    margin-top: 20px;\\n}\\n\\n.cell {\\n    background-color: white;\\n    aspect-ratio: 1/1;\\n    width: calc(45vh / 10);\\n    border: 1px solid rgb(192, 192, 192);\\n}\\n\\n.rotate {\\n    position: absolute;\\n    bottom: 5px;\\n    right: 20px;\\n    aspect-ratio: 1;\\n    height: 30px;\\n    border-radius: 100px;\\n    border: 1px solid var(--darker-blue);\\n    background-color: var(--dark-blue);\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?../../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://battleships/../../node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!******************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleships/../../node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"../../node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"../../node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"../../node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"../../node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./style.css */ \"../../node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleships/./src/style.css?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleships/../../node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			id: moduleId,
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;