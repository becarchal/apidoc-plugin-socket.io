/**
 * PostProcess
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {Object[]} preProcess
 * @param {Object}   packageInfos
 */
function postProcess(parsedFiles, filenames, preProcess, packageInfos) {
  var targetName = 'type';

  parsedFiles.forEach(function(parsedFile) {
    parsedFile.forEach(function(block) {
      var typeStr = block.local[targetName];
      if (typeStr) {
        block.local[targetName] = typeStr.split(",");
      }
    });
  });
}

/**
 * Exports
 */
module.exports = {
  postProcess: postProcess
};
