const test = require('tape')
const deepDiff = require('deep-diff')

const ParseStream = require('../../lib/parse-stream')

const inputChunks = require('./stubs/inputs/stream')
const outputAst = require('./stubs/outputs/stream')

function getDiff (output, ast) {
  const diff = deepDiff(output, ast)

  if (diff !== undefined) {
    console.log(JSON.stringify(diff, null, 2))
  }

  return diff
}

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
    const diff = getDiff(outputAst, ast)

    t.equal(diff, undefined, 'Builds AST from Chunks')
    t.end()
  })
})
