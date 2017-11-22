const test = require('tape')

const constructTree = require('../../lib/construct-tree')
const { getDiff } = require('../test-helpers')
const { clearAst } = require('../../lib/helpers')

function nestedTags (t) {
  const input = require('./stubs/inputs/nested-tags')
  const output = require('./stubs/outputs/nested-tags')

  const { ast } = constructTree(input)
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Nested Tags')
}

function attributes (t) {
  const { inputTokens } = require('./stubs/inputs/attributes')
  const output = require('./stubs/outputs/attributes')

  const { ast } = constructTree(inputTokens)
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Attributes')
}

function comments (t) {
  const { inputTokens } = require('./stubs/inputs/comments')
  const output = require('./stubs/outputs/comments')

  const { ast } = constructTree(inputTokens)
  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Comments')
}

function doctypes (t) {
  const input = require('./stubs/inputs/doctypes')
  const output = require('./stubs/outputs/doctypes')

  const { ast } = constructTree(input)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Doctypes')
}

function scriptTags (t) {
  const { inputTokens } = require('./stubs/inputs/script-tags')
  const output = require('./stubs/outputs/script-tags')

  const { ast } = constructTree(inputTokens)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Script Tags')
}

function styleTags (t) {
  const { inputTokens } = require('./stubs/inputs/style-tags')
  const output = require('./stubs/outputs/style-tags')

  const { ast } = constructTree(inputTokens)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Style Tags')
}

function tagsRegister (t) {
  const { inputTokens } = require('./stubs/inputs/tags-register')
  const output = require('./stubs/outputs/tags-register')

  const { ast } = constructTree(inputTokens)

  const diff = getDiff(output, clearAst(ast))

  t.equal(diff, undefined, 'Style Tags')
}

test('Tree Constructor', (t) => {
  nestedTags(t)
  attributes(t)
  comments(t)
  doctypes(t)
  scriptTags(t)
  styleTags(t)
  tagsRegister(t)

  t.end()
})
