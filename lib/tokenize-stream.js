const { Transform } = require('stream')

const tokenize = require('./tokenize')

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

    this.currentPositionOffset = 0
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
        positionOffset: this.currentPositionOffset
      }
    )

    this.currentTokenizerState = state
    this.currentPositionOffset += chunk.length

    callback(null, tokens)
  }

  _flush (callback) {
    const tokenizeResults = tokenize(
      '',
      this.currentTokenizerState,
      {
        isFinalChunk: true,
        positionOffset: this.currentPositionOffset
      }
    )

    this.push(tokenizeResults.tokens)

    callback()
  }
}

module.exports = TokenizeStream
