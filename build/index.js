/* index.js
 * Loads the dev-tasks library
 * Dependencies: Ops class
 * Author: Joshua Carter
 * Created: July 4, 2017
 */
"use strict";
//include modules

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ops = require("./Ops.js");

//create ops instance
var instance = new _Ops.Ops();
//export modules
exports.default = instance;