const test = require('tape')

const ParseStream = require('../../lib/parse-stream')

const { clearAst } = require('../../lib/helpers')
const { inputChunks } = require('./stubs/inputs/stream')
const outputAst = require('./stubs/outputs/stream')
const { getDiff } = require('../test-helpers')

test('Stream Parser', (t) => {
  const parseStream = new ParseStream()
  let ast

  parseStream.on('data', (resultAst) => {
    ast = resultAst
  })

  inputChunks.forEach((chunk) => {
    parseStream.write(chunk)
  })

  parseStream.end()

  parseStream.on('finish', () => {
    const diff = getDiff(outputAst, clearAst(ast))

    t.equal(diff, undefined, 'Builds AST from Chunks')
    t.end()
  })
})
