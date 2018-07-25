/**
 * Post Filter parsed results
 * Remove useless http sampleUrl, happen when sampleUrl is configed but no get or post defined in api tag.
 *
 * @param {Object[]} parsedFiles
 * @param {String[]} filenames
 * @param {String}   tagName     Example: 'parameter'
 * @returns {Object}
 */
function postFilter(parsedFiles, filenames, tagName) {
    tagName = 'sampleRequest';

    parsedFiles.forEach(function(parsedFile) {
        parsedFile.forEach(function(block) {
            if (block.local[tagName] && block.local['type'] && block.local['type'].indexOf("get")===-1 && block.local['type'].indexOf("post")===-1) {
                delete block.local[tagName];
            }
            if(!block.local['type']){
              delete block.local[tagName];
            }
        });
    });
}

/**
 * Exports
 */
module.exports = {
    postFilter: postFilter
};
