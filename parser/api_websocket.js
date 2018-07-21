// Same as @apiParam
var trim = require('../utils/trim');

function parse(content, source) {
  content = trim(content);
  if (content === 'true') {
    return {
      websocket: true
    }
  } else if (content === 'false') {
    return {
      websocket: false
    }
  } else {
    //match all format
    var res = /^\{(.*):(.*)\}\s+(.+)$/.exec(content);
    if (res) {
      return {
        websocket: {
          cmd: trim(res[1]),
          func: trim(res[2]),
          url: trim(res[3])
        }
      };

    } else {
      //match only url
      res = /^([^\{]+)$/.exec(content);
      if (res) {
        return {
          websocket: {
            url: trim(res[1])
          }
        }
      } else {
        //match only cmd:func
        res = /^\{(.*):(.*)\}$/.exec(content);
        if (res) {
          return {
            websocket: {
              cmd: trim(res[1]),
              func: trim(res[2])
            }
          }
        }
      }
      return {
        websocket: true
      }
    }
  }
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local',
  method: 'insert',
};
