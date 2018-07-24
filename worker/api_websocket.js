/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos) {
  var targetName = 'websocket';

  parsedFiles.forEach(function(parsedFile) {
    parsedFile.forEach(function(block) {

      //本地标签处理
      if (block.local[targetName]) {

        var entry = block.local[targetName];

        if (entry === true) {
          entry = {};
          entry.url = packageInfos.wsRequest;
        } else {
          if (!entry.url) {
            entry.url = packageInfos.wsRequest;
          }
          // Check if is an internal url
          if (packageInfos.wsRequest && entry.url.length >= 2 && entry.url.substr(0, 2).toLowerCase() !== 'ws') {
            // Prepend sampleUrl
            entry.url = packageInfos.wsRequest + entry.url;
          }
        }

        if (block.local.url && (!entry.cmd || !entry.func)) {
          parseAndAddParam(block, entry);
        }

        block.local[targetName] = entry;


      } else {
        if (block.local[targetName] === false) {
          delete block.local[targetName];

        } else {
          //全局
          if (packageInfos.wsRequest && block.local.url) {
            var wsRequestField = {};
            parseAndAddParam(block, wsRequestField);
            wsRequestField.url = packageInfos.wsRequest;
            block.local[targetName] = wsRequestField;
          }
        }
      }

      if (block.local["type"] && block.local["type"].indexOf(targetName) === -1) {
        if (block.local[targetName]) {
          block.local["type"].push(targetName);
        }
      }
    });
  });
}

function parseAndAddParam(block, entry) {
  var target = block.local.url;
  var matches = /\/?(.+)\/(.+)\/?/.exec(target);
  if (!matches) {
    matches = /(.+):(.+)/.exec(target);
  }
  if (matches) {
    entry.cmd = matches[1];
    entry.func = matches[2];
  }
}
/**
 * Exports
 */
module.exports = {
  postProcess: postProcess
};
