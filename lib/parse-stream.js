const { Transform } = require('stream')

const parse = require('./parse')

class ParseStream extends Transform {
  constructor (options) {
    super(Object.assign(
      {},
      options,
      {
        objectMode: true,
        readableObjectMode: true
      }
    ))

    this.currentPositionOffset = 0
    this.currentParserState = undefined
  }

  _transform (tokensChunk, encoding, callback) {
    const { state, ast } = parse(
      tokensChunk,
      this.currentParserState,
      {
        positionOffset: this.currentPositionOffset
      }
    )

    this.currentParserState = state
    this.currentPositionOffset += tokensChunk.length

    callback(null, ast)
  }
}

module.exports = ParseStream
