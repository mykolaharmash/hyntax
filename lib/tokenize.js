let cloneState = require('./helpers').cloneState
let dataContext = require('./tokenize-contexts/data')
let openTagStartContext = require('./tokenize-contexts/open-tag-start')
let openTagEndContext = require('./tokenize-contexts/open-tag-end')
let closeTagContext = require('./tokenize-contexts/close-tag')
let attributesContext = require('./tokenize-contexts/attributes')
let attributeKeyContext = require('./tokenize-contexts/attribute-key')
let attributeAssignmentContext = require('./tokenize-contexts/attribute-assignment')
let attributeValueContext = require('./tokenize-contexts/attribute-value')
let attributeValueStartQuoteContext = require('./tokenize-contexts/attribute-value-start-quote')
let attributeValueQuotedContext = require('./tokenize-contexts/attribute-value-quoted')
let attributeValueEndQuoteContext = require('./tokenize-contexts/attribute-value-end-quote')

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


function tokenizeChars (chars, initialState) {
  let state = cloneState(initialState)

  while (state.caretPosition < chars.length) {
    let char = chars[state.caretPosition]
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

  return state
}


module.exports = function tokenize (content = '') {
  let chars = [...content]
  let initialState = {
    currentContextType: 'data',
    decisionBuffer: '',
    accumulatedContent: '',
    tokens: [],
    caretPosition: 0
  }

  let state = tokenizeChars(chars, initialState)

  return state.tokens
}
