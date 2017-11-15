const deepDiff = require('deep-diff')
const util = require('util')

function getDiff (output, ast) {
  const diff = deepDiff(output, ast)

  if (diff !== undefined) {
    console.log(JSON.stringify(diff, null, 2))
  }

  return diff
}

function logAst (ast) {
  console.log(util.inspect(ast, { showHidden: false, depth: null }))
}

module.exports = {
  getDiff,
  logAst
}
