const app = require('koa')();
// const route = require('koa-route');

// loading config file and add to global
const configs = require("./configs/configs");

// gzip compress open by default
const compress = require("koa-compress");
app.use(compress());

// static files
const serve = require("koa-static");
const staticFilePath = configs.path.static;
app.use(serve(staticFilePath));
console.log('static file folder:', staticFilePath);

// routes
app.use(require("./route/routes"));

// const xtpl = require('xtpl/lib/koa');
// app = require('xtpl/lib/koa')(require('koa')(),{
//     views:'./view'
// });

// app.use(route.get('/:name', function*(name) {
//     yield this.render('index', {title: name});
// }));

// app.use(route.get('/', function*(name) {
//     yield this.render('index', {title: 'index'});
// }));

// 所有没有命中的路由
app.use(function *() {
    this.throw("404 not found, root path only now.", 404);
});

app.listen(configs.app.port);
console.log('app run at port', configs.app.port);