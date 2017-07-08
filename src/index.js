/* index.js
 * Loads the dev-tasks library
 * Dependencies: Ops class
 * Author: Joshua Carter
 * Created: July 4, 2017
 */
"use strict";
//include modules
import { Ops } from './Ops.js';
//create ops instance
var instance = new Ops();
//export modules
module.exports = instance;
