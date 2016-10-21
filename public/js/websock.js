(function() {
    "use strict";

    var version = '1.0.0';


    var websock = function (sockObj) {
        return websock.fn.init(sockObj);
    }


    websock.fn = websock.prototype = {
        version: version,
        // websocket url
        url: undefined,
        // websocket object
        websock: undefined,
        // listen event
        open: null,
        onclose: null,
        message: null,
        error: null,
        // method from WebSocket
        send: function(message) {
            websock.fn.websock.send(message);
        },
        close: function() {
            websock.fn.websock.close();
        }
    }


    websock.fn.init = function (sockObj) {
        websock.fn.url = sockObj.url;
        websock.fn.websock = new WebSocket(sockObj.url);
        websock.fn.open = sockObj.open ? sockObj.open : null;
        websock.fn.onclose = sockObj.onclose ? sockObj.onclose : null;
        websock.fn.message = sockObj.message ? sockObj.message : null;
        websock.fn.error = sockObj.error ? sockObj.error : null;
        websock.fn.websock.onopen = websock.fn.open;
        websock.fn.websock.onclose = websock.fn.onclose;
        websock.fn.websock.onmessage = websock.fn.message;
        websock.fn.websock.onerror = websock.fn.error;
        return this;
    }
    window.websock = websock;
})()