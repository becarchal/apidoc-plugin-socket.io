var trim = require('../utils/trim');

function parse(content, source) {
  content = trim(content);
  var res = {
    websocket: true
  };
  if (content === 'true') {} else if (content === 'false') {

    res.websocket = false

  } else {

    //match all format
    var res = /^(?:\{([^\}]+):([^\}]*)\}?\s*)?(?:\s*([^\{\}]+))?/.exec(content);
    if (res) {
      res = {
        websocket: {
          cmd: res[1] ? trim(res[1]) : null,
          func: res[2] ? trim(res[2]) : null,
          url: res[3] ? trim(res[3]) : null
        }
      };
    }
  }
  return res;
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: 'local',
  method: 'insert',
};
