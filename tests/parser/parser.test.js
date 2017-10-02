const test = require('tape')
const deepDiff = require('deep-diff')

const parse = require('../../lib/parse')

function getDiff (output, ast) {
  const diff = deepDiff(output, ast)

  if (diff !== undefined) {
    console.log(JSON.stringify(diff, null, 2))
  }

  return diff
}

test('Parser', (t) => {
  const input = require('./stubs/inputs/nested-tags')
  const output = require('./stubs/outputs/nested-tags')

  const ast = parse(input)
  const diff = getDiff(output, ast)

  t.equal(diff, undefined, 'Nested Tags')
  t.end()
})
