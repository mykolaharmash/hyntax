const deepDiff = require('deep-diff')

function getDiff (output, ast) {
  const diff = deepDiff(output, ast)

  if (diff !== undefined) {
    console.log(JSON.stringify(diff, null, 2))
  }

  return diff
}

module.exports = {
  getDiff
}
