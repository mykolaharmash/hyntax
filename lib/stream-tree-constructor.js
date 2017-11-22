const { Transform } = require('stream')

const constructTree = require('./construct-tree')

class StreamTreeConstructor extends Transform {
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
    this.currentState = undefined
  }

  _transform (tokensChunk, encoding, callback) {
    const { state, ast } = constructTree(
      tokensChunk,
      this.currentState,
      {
        positionOffset: this.currentPositionOffset
      }
    )

    this.currentState = state
    this.currentPositionOffset += tokensChunk.length

    callback(null, ast)
  }
}

module.exports = StreamTreeConstructor
