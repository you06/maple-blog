"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const Application = require("../controllers/Application");
const Index = require("../controllers/Index");
const Article = require("../controllers/Article");

// load middlewares
// const verifyToken = require("../middlewares/verifyToken");

// index
router.get('/', Application.index);
router.get('/api/article', Article.enum);
router.get('/api/article/:id', Article.getArticle);
router.get('/*', Index.index);

module.exports = router.routes();
