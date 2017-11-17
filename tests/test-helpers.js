const deepDiff = require('deep-diff')
const util = require('util')
const fs = require('fs')
const tokenize = require('../lib/tokenize')

function getDiff (output, ast) {
  const diff = deepDiff(output, ast)

  if (diff !== undefined) {
    console.log(JSON.stringify(diff, null, 2))
  }

  return diff
}

function inspect (obj) {
  return util.inspect(obj, { showHidden: false, depth: null })
}

function logAst (ast) {
  console.log(inspect(ast))
}

function generateTokens (htmlString) {
  const { tokens } = tokenize(htmlString)

  fs.writeFileSync('./tmp/tokens.js', inspect(tokens))
}

module.exports = {
  getDiff,
  logAst,
  inspect,
  generateTokens
}
