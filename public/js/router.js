(function () {
  "use strict";
  function Router () {};
  Router.prototype.routeTable = {};
  Router.prototype.route = function ( path, callback ) {
    if (typeof path !== 'string' || typeof callback !== 'function') {
      throw('invalid param dataType');
    }
    else {
      Router.prototype.routeTable[path] = callback;
    }
  };

  // when refresh
  window.addEventListener('load', function () {
    var path = location.hash.slice(1) || '/';
    var parsePath = path.match(/^(.*)\?.*$/);
    if (parsePath) path = parsePath[1];
    var callback = Router.prototype.routeTable[path];
    if ( callback ) { callback && callback(); }
  }, false);
  // when hash change
  window.addEventListener('hashchange', function () {
    var path = location.hash.slice(1) || '/';
    var parsePath = path.match(/^(.*)\?.*$/);
    if (parsePath) path = parsePath[1];
    var callback = Router.prototype.routeTable[path];
    if ( callback ) { callback && callback(); }
  }, false);

  window.Router = new Router();
})();