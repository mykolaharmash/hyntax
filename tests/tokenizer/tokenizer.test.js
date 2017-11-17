const fs = require('fs')
const test = require('tape')

const tokenize = require('../../lib/tokenize')
const getDiff = require('../test-helpers').getDiff

const testCases = {
  'Opening and closing text': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/opening-closing-text.html'), 'utf8'),
    output: require('./stubs/outputs/opening-closing-text')
  },
  'Nested tags': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/nested-tags.html'), 'utf8'),
    output: require('./stubs/outputs/nested-tags')
  },
  'Custom elements': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/custom-elements.html'), 'utf8'),
    output: require('./stubs/outputs/custom-elements')
  },
  'Script elements': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/script-elements.html'), 'utf8'),
    output: require('./stubs/outputs/script-elements')
  },
  'Script elements with attributes': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/script-elements-attributes.html'), 'utf8'),
    output: require('./stubs/outputs/script-elements-attributes')
  },
  'Attributes (quotes)': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/attributes-quote.html'), 'utf8'),
    output: require('./stubs/outputs/attributes-quote')
  },
  'Doctype': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/doctypes.html'), 'utf8'),
    output: require('./stubs/outputs/doctypes')
  },
  'Comments': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/comments.html'), 'utf8'),
    output: require('./stubs/outputs/comments')
  },
  'Style elements': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/style-elements.html'), 'utf8'),
    output: require('./stubs/outputs/style-elements')
  },
  'Style elements with attributes': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/style-elements-attributes.html'), 'utf8'),
    output: require('./stubs/outputs/style-elements-attributes')
  },
  'Different registers of Tags': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/tags-register.html'), 'utf8'),
    output: require('./stubs/outputs/tags-register')
  }
}

test('Tokenizer Syntax', (t) => {
  Object.keys(testCases).forEach((testCaseKey) => {
    const testCase = testCases[testCaseKey]
    const { tokens } = tokenize(testCase.input)

    const diff = getDiff(testCase.output, tokens)

    t.equal(diff, undefined, testCaseKey)
  })

  t.end()
})

