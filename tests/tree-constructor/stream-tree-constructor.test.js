const test = require('tape')

const StreamTreeConstructor = require('../../lib/stream-tree-constructor')

const { clearAst } = require('../../lib/helpers')
const { inputChunks } = require('./stubs/inputs/stream')
const outputAst = require('./stubs/outputs/stream')
const { getDiff } = require('../test-helpers')

test('Stream Tree Constructor', (t) => {
  const streamTreeConstructor = new StreamTreeConstructor()
  let ast

  streamTreeConstructor.on('data', (resultAst) => {
    ast = resultAst
  })

  inputChunks.forEach((chunk) => {
    streamTreeConstructor.write(chunk)
  })

  streamTreeConstructor.end()

  streamTreeConstructor.on('finish', () => {
    const diff = getDiff(outputAst, clearAst(ast))

    t.equal(diff, undefined, 'Builds AST from Chunks')
    t.end()
  })
})
