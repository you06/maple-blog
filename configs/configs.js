"use strict";
const path = require('path');





// load configs.json
const configs = require('../configs.json');
const ossConfigs = require('../oss.conf.js').ossConf;

// Located in the root directory of the project
const root = path.dirname(__dirname);

module.exports.path = {};
module.exports.path.root = root;
module.exports.path.static = path.join(root, 'public');
module.exports.path.views = path.join(root, 'view');
module.exports.path.upload = path.join(root, 'upload');

// jwt settings
// module.exports.jwt = configs.jwt;

// port
module.exports.app = configs.app;
module.exports.cookie = configs.cookie;
module.exports.websocket = configs.websocket;
module.exports.ossConfigs = ossConfigs;