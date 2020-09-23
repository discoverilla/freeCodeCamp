var rehype = require('rehype');
var vfile = require('vfile');

var getComments = require('./plugins/get-html-comments');

const processor = rehype().use(getComments);

function extractComments(html) {
  return processor.processSync(vfile(html)).data;
}

module.exports = extractComments;
