"use strict";
const route = require("koa-route");
const configs = require("../configs/configs");

// load controllers
const Index = require("../websocket/Index");

// load middlewares


// index
// route.all('/', Index.index);
// var route.all('/test/:greeting', Index.test);


module.exports.route = route.all('/', Index.index);
