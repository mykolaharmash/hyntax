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

    this.currentState = undefined
  }

  _transform (tokensChunk, encoding, callback) {
    const { state, ast } = constructTree(
      tokensChunk,
      this.currentState
    )

    this.currentState = state

    callback(null, ast)
  }
}

module.exports = StreamTreeConstructor
