const test = require('tape')

const parse = require('../../lib/parse')
const getDiff = require('../test-helpers').getDiff

test('Parser', (t) => {
  const input = require('./stubs/inputs/nested-tags')
  const output = require('./stubs/outputs/nested-tags')

  const { ast } = parse(input)
  const diff = getDiff(output, ast)

  t.equal(diff, undefined, 'Nested Tags')
  t.end()
})
