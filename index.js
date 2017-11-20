const tokenize = require('./lib/tokenize')
const parse = require('./lib/parse')
const TokenizeStream = require('./lib/tokenize-stream')
const ParseStream = require('./lib/parse-stream')

// Needs to be separate exports
// in order to be properly bundled
// and recognised by Rollup as named
// exports
module.exports.tokenize = tokenize
module.exports.parse = parse
module.exports.TokenizeStream = TokenizeStream
module.exports.ParseStream = ParseStream
