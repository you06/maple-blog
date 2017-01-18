"use strict";
const router = require("koa-router")();
const configs = require("../configs/configs");

// load controllers
const Application = require("../controllers/Application");
const Index = require("../controllers/Index");
const Article = require("../controllers/Article");
const Admin = require("../controllers/Admin");

// load middlewares
// const verifyToken = require("../middlewares/verifyToken");

// index
router.get('/', Application.index);
router.get('/api/article', Article.enum);
router.get('/api/article/:id/info', Article.getArticleInfo);
router.get('/api/article/:id', Article.getArticle);
router.get('/admin/content', Admin.admin);
router.get('/admin', Admin.index);
router.get('/admin.html', Admin.index);
router.post('/admin/login', Admin.login);
router.post('/admin/leaf', Admin.new);
router.post('/admin/leaf/:id', Admin.update);
router.post('/admin/api/image', Admin.uploadImage);
router.get('/*', Index.index);

module.exports = router.routes();
