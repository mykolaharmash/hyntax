const tokenize = require('./tokenize')
const { Transform, Writable } = require('stream')

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
    //console.log('transform', chunk)
    let chunkString = chunk

    if (Buffer.isBuffer(chunk)) {
      chunkString = chunk.toString()
    }

    const { state, tokens } = tokenize(
      chunk,
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

class CustomWritable extends Writable {
  _write (data, encoding, callback) {
    console.log(data)
    callback()
  }
}

const customWritable = new CustomWritable({ objectMode: true })

customWritable.on('finish', () => {
  console.timeEnd('tokenize')
  //console.log('FINISH!')
})

const chunks = [
  `<div>some thing</d`,
  'iv><some-component>another',
  ' thing</some',
  '-component>',
  '<div some="',
  'attribute goes here"',
  ' and=here',
  '>sdlfk</div>',
  'closing text'
]

const tokenizeStream = new TokenizeStream()

tokenizeStream.pipe(customWritable)
console.time('tokenize')
tokenizeStream.write(chunks[0])
tokenizeStream.write(chunks[1])
tokenizeStream.write(chunks[2])
tokenizeStream.write(chunks[3])
tokenizeStream.write(chunks[4])
tokenizeStream.write(chunks[5])
tokenizeStream.write(chunks[6])
tokenizeStream.write(chunks[7])
tokenizeStream.write(chunks[8])
tokenizeStream.end()
