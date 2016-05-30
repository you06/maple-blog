var koa = require('koa');
var route = require('koa-route');
var xtpl = require('xtpl/lib/koa');

var app = require('xtpl/lib/koa')(require('koa')(),{
    views:'./view'
});

app.use(route.get('/:name', function*(name) {
    yield this.render('index', {title: name});
}));

app.use(route.get('/', function*(name) {
    yield this.render('index', {title: 'index'});
}));

// 所有没有命中的路由
app.use(function *() {
    this.throw("404 not found, root path only now.", 404);
});

app.listen(3000);