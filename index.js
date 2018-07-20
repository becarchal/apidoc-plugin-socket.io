/**
 * Only a test and example plugin. It demonstrates the usage of the apidoc hook system.
 *
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
var app = {};

module.exports = {

    init: function(_app) {
        app = _app;
        //
        // Add Parsers (!!! experimental !!!)
        //
        app.parsers.apiwebsocket = {
          parse: parseWebsocket,
          path: 'local',
          method: 'insert'
        };
    }

};

/**
 * Simple parser. Add priority to tree.
 * Examples: https://github.com/apidoc/apidoc-core/tree/master/lib/parsers
 */
function parseWebsocket(content) {
  if(content ==='true'){
    return {
      websocket:true
    }
  }else{
    return {
      websocket: {
        state: content,
        url: 'http://fox'
      }
    };
  }
}
