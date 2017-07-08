/* index.js
 * Loads the dev-tasks library
 * Dependencies: Ops class
 * Author: Joshua Carter
 * Created: July 4, 2017
 */
"use strict";
//include modules

var _Ops = require("./Ops.js");

//create ops instance
var instance = new _Ops.Ops();
//export modules
module.exports = instance;