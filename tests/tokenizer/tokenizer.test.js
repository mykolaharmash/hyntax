const fs = require('fs')
const test = require('tape')

const tokenize = require('../../lib/tokenize')

const testCases = {
  'opening-closing-text': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/opening-closing-text.html'), 'utf8'),
    output: require('./stubs/outputs/opening-closing-text')
  },
  'nested-tags': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/nested-tags.html'), 'utf8'),
    output: require('./stubs/outputs/nested-tags')
  },
  'custom-elements': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/custom-elements.html'), 'utf8'),
    output: require('./stubs/outputs/custom-elements')
  }
}

test('Tokenizer', (t) => {
  Object.keys(testCases).forEach((testCaseKey) => {
    const testCase = testCases[testCaseKey]
    const { tokens } = tokenize(testCase.input)

    t.deepEqual(tokens, testCase.output, `${ testCaseKey }.html`)
  })

  t.end()
})

