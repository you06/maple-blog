"use strict";

module.exports.index = function* (next) {
  // `this` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object. 
  // the websocket is added to the context on `this.websocket`. 
  var websocketObj = this.websocket;
  this.websocket.send('[node says:] ' + 'Hello World');
  this.websocket.on('message', function(message) {
    // do something with the message from client 
    console.log(message);
    websocketObj.send('[node says:] ' + message);
  });
  // yielding `next` will pass the context (this) on to the next ws middleware 
  yield next;
}