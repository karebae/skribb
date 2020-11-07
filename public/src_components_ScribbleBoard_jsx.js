/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkhrsjo1_scribble"] = self["webpackChunkhrsjo1_scribble"] || []).push([["src_components_ScribbleBoard_jsx"],{

/***/ "./src/components/ScribbleBoard.jsx":
/*!******************************************!*\
  !*** ./src/components/ScribbleBoard.jsx ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react_p5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-p5 */ \"./node_modules/react-p5/build/index.js\");\n/* harmony import */ var react_p5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_p5__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/enums/socketEvents */ \"./src/lib/enums/socketEvents.js\");\n\n\n\n\nfunction ScribbleBoard(_ref) {\n  var socket = _ref.socket,\n      currentDrawer = _ref.currentDrawer,\n      isDraw = _ref.isDraw;\n  var x = 50;\n  var y = 50;\n\n  var setup = function setup(p5, canvasParentRef) {\n    p5.createCanvas(500, 500).parent(canvasParentRef);\n    p5.background(255); //white\n\n    socket.on(_lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__.default.DRAW, function (data) {\n      console.log(\"Got: \" + data.x + \" \" + data.y);\n      var color = data.isDraw ? 0 : 255;\n      p5.stroke(color);\n      p5.strokeWeight(4);\n      p5.line(data.x, data.y, data.px, data.py);\n    });\n    socket.on(_lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__.default.CLEAR_DRAW, function () {\n      console.log('clear the drawing!');\n      p5.clear();\n    });\n  };\n\n  function sendmouse(x, y, pX, pY, isDraw) {\n    console.log(\"sendmouse: \" + x + \" \" + y); // Make a little object with  and y\n\n    var data = {\n      x: x,\n      y: y,\n      px: pX,\n      py: pY,\n      isDraw: isDraw\n    }; // Send that object to the socket\n\n    socket.emit(_lib_enums_socketEvents__WEBPACK_IMPORTED_MODULE_2__.default.DRAW, data);\n  }\n\n  function mouseDragged(p5) {\n    // Draw some white circles\n    if (currentDrawer) {\n      var color = isDraw ? 0 : 255; //draw line\n\n      p5.stroke(color);\n      p5.strokeWeight(4);\n      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY); // Send the mouse coordinates\n\n      sendmouse(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY, isDraw);\n    }\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_p5__WEBPACK_IMPORTED_MODULE_1___default()), {\n    setup: setup,\n    mouseDragged: mouseDragged,\n    style: {\n      border: '1px solid black'\n    }\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScribbleBoard);\n\n//# sourceURL=webpack://hrsjo1-scribble/./src/components/ScribbleBoard.jsx?");

/***/ })

}]);