(function () {
  "use strict";
  window.routeParam = [];
  function Router () {};
  Router.prototype.routeTable = {};
  Router.prototype.notFount = function() {}
  Router.prototype.route = function (path, callback) {
    if (typeof path !== 'string' || typeof callback !== 'function') {
      throw('invalid param dataType');
    }
    else {
      Router.prototype.routeTable[path] = callback;
    }
  };
  Router.prototype.lookTable = function(pathname) {
    for (var index in Router.prototype.routeTable) {
      var hitRoute = true;
      var routeParam = [];
      var indexArr = index.split('/');
      var pathArr = pathname.split('/');
      if (pathArr.length === indexArr.length && index !== '/' && index !== '404') {
        for (var i = 0; i < indexArr.length; i++) {
          var regex = new RegExp(indexArr[i]);
          if (!regex.test(pathArr[i]) && ':' !== indexArr[i][0]) {
            hitRoute = false;
          }
          else if (':' === indexArr[i][0]) {
            routeParam[indexArr[i].substr(1, indexArr[i].length - 1)] = pathArr[i];
          }
        }
      }
      else {
        hitRoute = false;
      }
      if (hitRoute) {
        window.routeParam = routeParam;
        return Router.prototype.routeTable[index];
      }
    }
    return Router.prototype.routeTable['404'];
  }

  Router.prototype.jump = function(path) {
    history.pushState(path, '', path);
    var path = location.pathname || '/';
    var parsePath = path.match(/^(.*)\?.*$/);
    if (parsePath) path = parsePath[1];
    var callback = Router.prototype.lookTable(path);
    if ( callback ) { callback && callback(); }
  }

  // when refresh
  window.addEventListener('load', function () {
    var path = location.pathname || '/';
    var parsePath = path.match(/^(.*)\?.*$/);
    if (parsePath) path = parsePath[1];
    var callback = Router.prototype.lookTable(path);
    if ( callback ) { callback && callback(); }
  }, false);
  // when state change
  window.addEventListener('popstate', function () {
    console.log('popstate');
    var path = location.pathname || '/';
    var parsePath = path.match(/^(.*)\?.*$/);
    if (parsePath) path = parsePath[1];
    var callback = Router.prototype.lookTable(path);
    if ( callback ) { callback && callback(); }
  }, false);

  window.Router = new Router();
})();