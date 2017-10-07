const { Writable } = require('stream')
const test = require('tape')
const deepDiff = require('deep-diff')

const TokenizeStream = require('../../lib/tokenize-stream')

const inputChunks = require('./stubs/inputs/stream')
const outputTokens = require('./stubs/outputs/stream')

function getDiff (output, ast) {
  const diff = deepDiff(output, ast)

  if (diff !== undefined) {
    console.log(JSON.stringify(diff, null, 2))
  }

  return diff
}

class TestWritable extends Writable {
  constructor (options) {
    super(options)

    this.tokens = []
  }

  _write (data, encoding, callback) {
    this.tokens = this.tokens.concat(data)
    callback()
  }
}

test('Stream Tokenizer', (t) => {
  const tokenizeStream = new TokenizeStream()
  const testWritable = new TestWritable({ objectMode: true })

  tokenizeStream.pipe(testWritable)

  inputChunks.forEach((chunk) => {
    tokenizeStream.write(chunk)
  })

  tokenizeStream.end()

  testWritable.on('finish', () => {
    const diff = getDiff(outputTokens, testWritable.tokens)

    t.equal(diff, undefined, 'Generates tokens from a stream of chunks')
    t.end()
  })
})
