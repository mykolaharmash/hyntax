const test = require('tape')

const parse = require('../../lib/parse')
const { getDiff } = require('../test-helpers')
const { clearAst } = require('../../lib/helpers')

function nestedTags (t) {
  const input = require('./stubs/inputs/nested-tags')
  const output = require('./stubs/outputs/nested-tags')

  const { ast } = parse(input)
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Nested Tags')
}

function attributes (t) {
  const { inputTokens } = require('./stubs/inputs/attributes')
  const output = require('./stubs/outputs/attributes')

  const { ast } = parse(inputTokens)
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Attributes')
}

function comments (t) {
  const { inputTokens } = require('./stubs/inputs/comments')
  const output = require('./stubs/outputs/comments')

  const { ast } = parse(inputTokens)
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Comments')
}

function doctypes (t) {
  const input = require('./stubs/inputs/doctypes')
  const output = require('./stubs/outputs/doctypes')

  const { ast } = parse(input)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Doctypes')
}

function scriptTags (t) {
  const { inputTokens } = require('./stubs/inputs/script-tags')
  const output = require('./stubs/outputs/script-tags')

  const { ast } = parse(inputTokens)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Script Tags')
}

function styleTags (t) {
  const { inputTokens } = require('./stubs/inputs/style-tags')
  const output = require('./stubs/outputs/style-tags')

  const { ast } = parse(inputTokens)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Style Tags')
}

test('Parser', (t) => {
  nestedTags(t)
  attributes(t)
  comments(t)
  doctypes(t)
  scriptTags(t)
  styleTags(t)

  t.end()
})
