const { Transform } = require('stream')

const tokenize = require('./tokenize')

class StreamTokenizer extends Transform {
  constructor (options) {
    super(Object.assign(
      {},
      options,
      {
        decodeStrings: false,
        readableObjectMode: true
      }
    ))

    this.currentTokenizerState = undefined
    this.setDefaultEncoding('utf8')
  }

  _transform (chunk, encoding, callback) {
    let chunkString = chunk

    if (Buffer.isBuffer(chunk)) {
      chunkString = chunk.toString()
    }

    const { state, tokens } = tokenize(
      chunkString,
      this.currentTokenizerState,
      { isFinalChunk: false }
    )

    this.currentTokenizerState = state

    callback(null, tokens)
  }

  _flush (callback) {
    const tokenizeResults = tokenize(
      '',
      this.currentTokenizerState,
      { isFinalChunk: true }
    )

    this.push(tokenizeResults.tokens)

    callback()
  }
}

module.exports = StreamTokenizer
