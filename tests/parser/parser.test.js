const test = require('tape')

const parse = require('../../lib/parse')
const getDiff = require('../test-helpers').getDiff
const clearAst = require('../../lib/helpers').clearAst
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
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'New Format')
}

function doctypes (t) {
  const input = require('./stubs/inputs/doctypes')
  const output = require('./stubs/outputs/doctypes')

  const { ast } = parse(input)

  //console.log(util.inspect(clearAst(ast), { showHidden: false, depth: null }))

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Doctypes')
}

test('Parser', (t) => {
  //nestedTags(t)
  //newFormat(t)
  doctypes(t)

  t.end()
})
