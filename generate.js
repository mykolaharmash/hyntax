let fs = require('fs')
let path = require('path')
let dataContext = require('./lib/tokenize-contexts/data')
let openTagStartContext = require('./lib/tokenize-contexts/open-tag-start')
let openTagEndContext = require('./lib/tokenize-contexts/open-tag-end')
let closeTagContext = require('./lib/tokenize-contexts/close-tag')
let attributesContext = require('./lib/tokenize-contexts/attributes')
let attributeKeyContext = require('./lib/tokenize-contexts/attribute-key')
let attributeAssignmentContext = require('./lib/tokenize-contexts/attribute-assignment')
let attributeValueContext = require('./lib/tokenize-contexts/attribute-value')
let attributeValueStartQuoteContext = require('./lib/tokenize-contexts/attribute-value-start-quote')
let attributeValueQuotedContext = require('./lib/tokenize-contexts/attribute-value-quoted')
let attributeValueEndQuoteContext = require('./lib/tokenize-contexts/attribute-value-end-quote')

let template = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf8')

let chars = [...template]

let contextsMap = {
  'data': dataContext,
  'open-tag-start': openTagStartContext,
  'open-tag-end': openTagEndContext,
  'close-tag': closeTagContext,
  'attributes': attributesContext,
  'attribute-key': attributeKeyContext,
  'attribute-assignment': attributeAssignmentContext,
  'attribute-value': attributeValueContext,
  'attribute-value-start-quote': attributeValueStartQuoteContext,
  'attribute-value-quoted': attributeValueQuotedContext,
  'attribute-value-end-quote': attributeValueEndQuoteContext
}

let state = {
  currentContextType: 'data',
  decisionBuffer: '',
  accumulatedContent: '',
  tokens: [],
  chars: chars,
  caretPosition: 0
}

while (state.caretPosition < state.chars.length) {
  let char = state.chars[state.caretPosition]
  let currentContext = contextsMap[state.currentContextType]

  state.decisionBuffer += char

  let syntaxHandler = currentContext.parseSyntax(state.decisionBuffer)

  if (!syntaxHandler) {
    state.accumulatedContent += state.decisionBuffer
    state.decisionBuffer = ''
  } else {
    state = syntaxHandler(state)
  }

  state.caretPosition++
}

console.log(state.tokens)
