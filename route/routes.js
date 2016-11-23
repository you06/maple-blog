"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const Application = require("../controllers/Application");
const Index = require("../controllers/Index");

// load middlewares
// const verifyToken = require("../middlewares/verifyToken");

// index
router.get('/', Application.index);
router.get('/*', Index.index);

module.exports = router.routes();
