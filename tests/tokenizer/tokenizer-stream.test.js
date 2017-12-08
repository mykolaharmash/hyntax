const { Writable } = require('stream')
const test = require('tape')

const StreamTokenizer = require('../../lib/stream-tokenizer')
const getDiff = require('../test-helpers').getDiff

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
  const streamTokenizer = new StreamTokenizer()
  const testWritable = new TestWritable({ objectMode: true })

  streamTokenizer.pipe(testWritable)

  inputChunks.forEach((chunk) => {
    streamTokenizer.write(chunk)
  })

  streamTokenizer.end()

  testWritable.on('finish', () => {
    const diff = getDiff(outputTokens, testWritable.tokens)

    t.equal(diff, undefined, 'Generates tokens from a stream of chunks')
    t.end()
  })
})
