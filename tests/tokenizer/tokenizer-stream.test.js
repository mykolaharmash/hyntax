const { Writable } = require('stream')
const test = require('tape')
const TokenizeStream = require('../../lib/tokenize-stream')

const inputChunks = require('./stubs/inputs/stream')
const outputTokens = require('./stubs/outputs/stream')

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
    t.deepEqual(
      testWritable.tokens,
      outputTokens,
      'Generates tokens from a stream of chunks')
    t.end()
  })
})
