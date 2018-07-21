/**
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
var websocketParser = require('./parser/api_websocket.js');
var websocketWorker = require('./worker/api_websocket.js');

var app = {};

module.exports = {

    init: function(_app) {
        app = _app;

        app.parsers.apiwebsocket = websocketParser;
        app.workers.apiwebsocket = websocketWorker;
    }

};
