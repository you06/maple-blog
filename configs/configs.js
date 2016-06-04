"use strict";
/* when enable database, add sequelize to 'package.json' and enable this
 * const Sequelize = require("sequelize");
 */
const path = require("path");

// load configs.json
const configs = require("../configs.json");

// Located in the root directory of the project
const root = path.dirname(__dirname);

module.exports.path = {};
module.exports.path.static = path.join(root, "public");
module.exports.path.views = path.join(root, "views");

// jwt settings
// module.exports.jwt = configs.jwt;

// port
module.exports.app = configs.app;
