/**
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
var websocketParser = require('./parser/api_websocket.js');
var websocketWorker = require('./worker/api_websocket.js');
var typeWorker      = require('./worker/api_type.js');

var app = {};

module.exports = {

    init: function(_app) {
        app = _app;

        app.workers.apitype      = typeWorker;
        app.parsers.apiwebsocket = websocketParser;
        app.workers.apiwebsocket = websocketWorker;

    }
};
