const tokenize = require('./lib/tokenize')
const constructTree = require('./lib/construct-tree')
const StreamTokenizer = require('./lib/stream-tokenizer')
const StreamTreeConstructor = require('./lib/stream-tree-constructor')

// Need to be separate exports
// in order to be properly bundled
// and recognised by Rollup as named
// exports
module.exports.tokenize = tokenize
module.exports.constructTree = constructTree
module.exports.StreamTokenizer = StreamTokenizer
module.exports.StreamTreeConstructor = StreamTreeConstructor
