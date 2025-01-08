/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/gameContext.ts":
/*!*******************************!*\
  !*** ./src/ts/gameContext.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   gameContext: () => (/* binding */ gameContext)\n/* harmony export */ });\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes */ \"./src/ts/shapes.ts\");\n/* harmony import */ var _tetrisUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetrisUtils */ \"./src/ts/tetrisUtils.ts\");\n\n\nconst gameContext = {\n    tetrisPlaygroundTarget: document.querySelector('.tetris-playground'),\n    shapeKeys: Object.keys(_shapes__WEBPACK_IMPORTED_MODULE_0__.shapes),\n    playground: (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_1__.createPlayground)(),\n    currentShape: {\n        shape: [],\n        color: '',\n    },\n    currentX: 3,\n    currentY: 0,\n    speed: 1000,\n    isPaused: false,\n};\n\n\n//# sourceURL=webpack://tetris/./src/ts/gameContext.ts?");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tetrisUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetrisUtils */ \"./src/ts/tetrisUtils.ts\");\n/* harmony import */ var _gameContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameContext */ \"./src/ts/gameContext.ts\");\n\n\nif (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext) {\n    (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.drawTetrisPlayground)(10, 20, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.tetrisPlaygroundTarget);\n}\n(0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.generateNewShape)();\n(0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.renderShape)();\nfunction gameLoop() {\n    setTimeout(() => {\n        if (!_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.isPaused) {\n            if (!(0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.isCollision)(_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY + 1)) {\n                (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.removePreviousShape)();\n                _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY++;\n                (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.renderShape)();\n            }\n            else {\n                (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.fixShape)();\n                (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.removeFullLines)();\n                (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.generateNewShape)();\n                if ((0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.isCollision)(_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY)) {\n                    alert('Игра окончена');\n                    return;\n                }\n                (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.renderShape)();\n            }\n        }\n        gameLoop();\n    }, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.speed);\n}\ngameLoop();\ndocument.addEventListener('keydown', (e) => {\n    if (e.code === 'Space') {\n        const newShape = (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.rotateShape)(_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape);\n        if (!(0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.isCollision)(newShape, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY)) {\n            (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.removePreviousShape)();\n            _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape = newShape;\n            (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.renderShape)();\n        }\n    }\n    else if (e.code === 'ArrowLeft') {\n        (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.moveShape)(-1);\n    }\n    else if (e.code === 'ArrowRight') {\n        (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.moveShape)(1);\n    }\n    else if (e.code === 'ArrowDown') {\n        _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.speed = 100;\n    }\n});\ndocument.addEventListener('keyup', (e) => {\n    if (e.code === 'ArrowDown') {\n        _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.speed = 1000;\n    }\n});\nconst moveLeftButton = document.getElementById('moveLeft');\nconst moveRightButton = document.getElementById('moveRight');\nmoveLeftButton.addEventListener('click', () => (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.moveShape)(-1));\nmoveRightButton.addEventListener('click', () => (0,_tetrisUtils__WEBPACK_IMPORTED_MODULE_0__.moveShape)(1));\n\n\n//# sourceURL=webpack://tetris/./src/ts/index.ts?");

/***/ }),

/***/ "./src/ts/shapes.ts":
/*!**************************!*\
  !*** ./src/ts/shapes.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   shapes: () => (/* binding */ shapes)\n/* harmony export */ });\nconst shapes = {\n    S: {\n        shape: [\n            [0, 1, 1],\n            [1, 1, 0],\n        ],\n        color: 'yellowgreen',\n    },\n    Z: {\n        shape: [\n            [1, 1, 0],\n            [0, 1, 1],\n        ],\n        color: 'red',\n    },\n    T: {\n        shape: [\n            [1, 1, 1],\n            [0, 1, 0],\n        ],\n        color: 'purple',\n    },\n    O: {\n        shape: [\n            [1, 1],\n            [1, 1],\n        ],\n        color: 'yellow',\n    },\n    J: {\n        shape: [\n            [0, 1],\n            [0, 1],\n            [1, 1],\n        ],\n        color: 'blue',\n    },\n    L: {\n        shape: [\n            [1, 0],\n            [1, 0],\n            [1, 1],\n        ],\n        color: 'orange',\n    },\n    I: {\n        shape: [[1], [1], [1], [1]],\n        color: 'aqua',\n    },\n};\n\n\n//# sourceURL=webpack://tetris/./src/ts/shapes.ts?");

/***/ }),

/***/ "./src/ts/tetrisUtils.ts":
/*!*******************************!*\
  !*** ./src/ts/tetrisUtils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createPlayground: () => (/* binding */ createPlayground),\n/* harmony export */   drawTetrisPlayground: () => (/* binding */ drawTetrisPlayground),\n/* harmony export */   fixShape: () => (/* binding */ fixShape),\n/* harmony export */   generateNewShape: () => (/* binding */ generateNewShape),\n/* harmony export */   isCollision: () => (/* binding */ isCollision),\n/* harmony export */   moveShape: () => (/* binding */ moveShape),\n/* harmony export */   removeFullLines: () => (/* binding */ removeFullLines),\n/* harmony export */   removePreviousShape: () => (/* binding */ removePreviousShape),\n/* harmony export */   renderFixedBlocks: () => (/* binding */ renderFixedBlocks),\n/* harmony export */   renderShape: () => (/* binding */ renderShape),\n/* harmony export */   rotateShape: () => (/* binding */ rotateShape)\n/* harmony export */ });\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes */ \"./src/ts/shapes.ts\");\n/* harmony import */ var _gameContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameContext */ \"./src/ts/gameContext.ts\");\n\n\nfunction drawTetrisPlayground(x, y, target) {\n    if (x <= 0 || y <= 0)\n        throw new Error('x and y cannot be negative');\n    if (target.children.length)\n        throw new Error('Aborted: target element should be empty');\n    for (let rowsCount = 0; rowsCount < y; rowsCount++) {\n        const row = document.createElement('div');\n        row.className = 'row';\n        row.dataset['row'] = rowsCount.toString();\n        for (let cellsCount = 0; cellsCount < x; cellsCount++) {\n            const cell = document.createElement('div');\n            cell.className = 'cell';\n            cell.dataset['cell'] = cellsCount.toString();\n            row.append(cell);\n        }\n        target.append(row);\n    }\n}\nfunction renderFixedBlocks() {\n    var _a, _b;\n    for (let row = 0; row < _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground.length; row++) {\n        for (let col = 0; col < _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground[row].length; col++) {\n            const cell = (_b = (_a = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.tetrisPlaygroundTarget) === null || _a === void 0 ? void 0 : _a.children[row]) === null || _b === void 0 ? void 0 : _b.children[col];\n            if (!cell)\n                continue;\n            if (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground[row][col]) {\n                cell.style.backgroundColor = 'white';\n            }\n            else {\n                cell.style.backgroundColor = '';\n            }\n        }\n    }\n}\nfunction renderShape() {\n    var _a, _b;\n    const rowsToColor = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape.length;\n    const cellsToColor = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape[0].length;\n    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {\n        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {\n            if (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape[rowIndex][cellIndex]) {\n                const x = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX + cellIndex;\n                const y = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY + rowIndex;\n                if (x >= 0 && x < 10 && y >= 0 && y < 20) {\n                    const cell = (_b = (_a = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.tetrisPlaygroundTarget) === null || _a === void 0 ? void 0 : _a.children[y]) === null || _b === void 0 ? void 0 : _b.children[x];\n                    if (cell) {\n                        cell.style.backgroundColor = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.color;\n                    }\n                }\n            }\n        }\n    }\n}\nfunction removePreviousShape() {\n    var _a, _b;\n    const rowsToClear = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape.length;\n    const cellsToClear = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape[0].length;\n    for (let rowIndex = 0; rowIndex < rowsToClear; rowIndex++) {\n        for (let cellIndex = 0; cellIndex < cellsToClear; cellIndex++) {\n            if (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape[rowIndex][cellIndex]) {\n                const x = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX + cellIndex;\n                const y = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY + rowIndex;\n                if (x >= 0 && x < 10 && y >= 0 && y < 20) {\n                    if (!_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground[y][x]) {\n                        const cell = (_b = (_a = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.tetrisPlaygroundTarget) === null || _a === void 0 ? void 0 : _a.children[y]) === null || _b === void 0 ? void 0 : _b.children[x];\n                        if (cell) {\n                            cell.style.backgroundColor = '';\n                        }\n                    }\n                }\n            }\n        }\n    }\n}\nfunction rotateShape(shape) {\n    const rotatedShape = [];\n    const rows = shape.length;\n    const cols = shape[0].length;\n    for (let col = 0; col < cols; col++) {\n        rotatedShape[col] = [];\n        for (let row = rows - 1; row >= 0; row--) {\n            rotatedShape[col][rows - 1 - row] = shape[row][col];\n        }\n    }\n    return rotatedShape;\n}\nfunction moveShape(direction) {\n    if (!isCollision(_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX + direction, _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY)) {\n        removePreviousShape();\n        _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX += direction;\n        renderShape();\n    }\n}\nfunction createPlayground() {\n    const playground = [];\n    for (let row = 0; row < 20; row++) {\n        playground[row] = new Array(10).fill(0);\n    }\n    return playground;\n}\nfunction generateNewShape() {\n    const shapeKeyIndex = Math.floor(Math.random() * _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.shapeKeys.length);\n    const shapeKey = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.shapeKeys[shapeKeyIndex];\n    _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape = _shapes__WEBPACK_IMPORTED_MODULE_0__.shapes[shapeKey].shape;\n    _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.color = _shapes__WEBPACK_IMPORTED_MODULE_0__.shapes[shapeKey].color;\n    _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX = 3;\n    _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY = 0;\n}\nfunction isCollision(shape, x, y) {\n    for (let row = 0; row < shape.length; row++) {\n        for (let col = 0; col < shape[row].length; col++) {\n            if (shape[row][col]) {\n                const newX = x + col;\n                const newY = y + row;\n                if (newX < 0 || newX >= 10 || newY >= 20) {\n                    return true;\n                }\n                if (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground[newY][newX]) {\n                    return true;\n                }\n            }\n        }\n    }\n    return false;\n}\nfunction fixShape() {\n    for (let row = 0; row < _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape.length; row++) {\n        for (let col = 0; col < _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape[row].length; col++) {\n            if (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentShape.shape[row][col]) {\n                _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground[_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentY + row][_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.currentX + col] = 1;\n            }\n        }\n    }\n}\nfunction removeFullLines() {\n    for (let row = _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground.length - 1; row >= 0; row--) {\n        if (_gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground[row].every((cell) => cell === 1)) {\n            _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground.splice(row, 1);\n            _gameContext__WEBPACK_IMPORTED_MODULE_1__.gameContext.playground.unshift(new Array(10).fill(0));\n        }\n    }\n    renderFixedBlocks();\n}\n\n\n//# sourceURL=webpack://tetris/./src/ts/tetrisUtils.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/index.ts");
/******/ 	
/******/ })()
;