const deepDiff = require('deep-diff')
const util = require('util')

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

module.exports = {
  getDiff,
  logAst,
  inspect
}
