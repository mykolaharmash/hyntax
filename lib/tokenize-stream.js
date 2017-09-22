const tokenize = require('./tokenize')
const { Transform } = require('stream')

class TokenizeStream extends Transform {
  constructor (options) {
    super(Object.assign(
      {},
      options,
      {
        decodeStrings: false,
        readableObjectMode: true
      }
    ))

    this.currentContentOffset = 0
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
      {
        isFinalChunk: false,
        contentOffset: this.currentContentOffset
      }
    )

    this.currentTokenizerState = state
    this.currentContentOffset += chunk.length

    callback(null, tokens)
  }

  _flush (callback) {
    const tokenizeResults = tokenize(
      '',
      this.currentTokenizerState,
      {
        isFinalChunk: true,
        contentOffset: this.currentContentOffset
      }
    )

    this.push(tokenizeResults.tokens)

    callback()
  }
}

module.exports = TokenizeStream
