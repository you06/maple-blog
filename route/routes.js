"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const Application = require("../controllers/Application");
const Index = require("../controllers/Index");
const Tag = require("../controllers/Tag");
const Article = require("../controllers/Article");
const Admin = require("../controllers/Admin");

// load middlewares
// const verifyToken = require("../middlewares/verifyToken");

// index
router.get('/', Application.index);

router.get('/index', Index.index);
router.get('/index/article', Index.article);

router.get('/tag', Tag.index);
router.get('/tags', Tag.index);

router.get('/article', Article.index);

router.get('/admin', Admin.index);

module.exports = router.routes();
