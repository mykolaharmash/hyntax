const fs = require('fs')
const test = require('tape')

const tokenize = require('../../lib/tokenize')

const testCases = [
  '0'
]

testCases.forEach((testCase) => {
  const input = fs.readFileSync(`${ __dirname }/stubs/inputs/${ testCase }.html`, 'utf8')
  const output = require(`./stubs/outputs/${ testCase }.js`)

  const resultTokens = tokenize(input)

  test('Tokenizer', (t) => {
    t.deepEqual(
      resultTokens,
      output,
      `${ testCase }.html`
    )
    t.end()
  })
})

