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
    this.currentParserRootContext = undefined
  }

  _transform (tokensChunk, encoding, callback) {
    const { state, rootContext, ast } = parse(
      tokensChunk,
      this.currentParserState,
      this.currentParserRootContext,
      {
        positionOffset: this.currentPositionOffset
      }
    )

    this.currentParserState = state
    this.currentParserRootContext = rootContext
    this.currentPositionOffset += tokensChunk.length

    callback(null, ast)
  }
}

module.exports = ParseStream
