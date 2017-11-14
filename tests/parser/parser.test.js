const test = require('tape')

const parse = require('../../lib/parse')
const getDiff = require('../test-helpers').getDiff
const util = require('util')

function nestedTags (t) {
  const input = require('./stubs/inputs/nested-tags')
  const output = require('./stubs/outputs/nested-tags')

  const { ast } = parse(input)
  const diff = getDiff(output, ast)

  t.equal(diff, undefined, 'Nested Tags')
}

function newFormat (t) {
  const input = require('./stubs/inputs/new-format')
  const output = require('./stubs/outputs/new-format')

  const { ast } = parse(input)

  console.log(util.inspect(ast, { showHidden: true, depth: null }))

  //const diff = getDiff(output, ast)

  //t.equal(diff, undefined, 'New Format')
}

test('Parser', (t) => {
  //nestedTags(t)
  newFormat(t)

  t.end()
})
