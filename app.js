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
// app.use(serve({rootDir: 'public', rootPath: staticFilePath}));
app.use(serve(staticFilePath));
console.log('static file folder:', staticFilePath);

const session = require('koa-session');
app.keys = ['maple story'];
app.use(session(configs.cookie, app));

// routes
app.use(require("./route/routes"));

const websockify = require('koa-websocket');
const wsapp = websockify(app);
wsapp.ws.use(require('./route/ws.route.js').route);
wsapp.listen(configs.websocket.port);
console.log('websocket run at port', configs.websocket.port);

// 所有没有命中的路由
app.use(function *() {
    this.throw("", 404);
});

app.listen(configs.app.port);
console.log('maple run at port', configs.app.port);