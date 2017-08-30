const cloneState = require('./helpers').cloneDeep

const dataContext = require('./tokenize-contexts/data')
const openTagStartContext = require('./tokenize-contexts/open-tag-start')
const openTagEndContext = require('./tokenize-contexts/open-tag-end')
const closeTagContext = require('./tokenize-contexts/close-tag')
const attributesContext = require('./tokenize-contexts/attributes')
const attributeKeyContext = require('./tokenize-contexts/attribute-key')
const attributeAssignmentContext = require('./tokenize-contexts/attribute-assignment')
const attributeValueContext = require('./tokenize-contexts/attribute-value')
const attributeValueStartQuoteContext = require('./tokenize-contexts/attribute-value-start-quote')
const attributeValueQuotedContext = require('./tokenize-contexts/attribute-value-quote')
const attributeValueEndQuoteContext = require('./tokenize-contexts/attribute-value-end-quote')
const attributeValueStartApostropheContext = require('./tokenize-contexts/attribute-value-start-apostrophe')
const attributeValueApostropheContext = require('./tokenize-contexts/attribute-value-apostrophe')
const attributeValueEndApostropheContext = require('./tokenize-contexts/attribute-value-end-apostrophe')
const attributeValueBareContext = require('./tokenize-contexts/attribute-value-bare')

const {
  TOKENIZER_CONTEXT_DATA,
  TOKENIZER_CONTEXT_OPEN_TAG_START,
  TOKENIZER_CONTEXT_OPEN_TAG_END,
  TOKENIZER_CONTEXT_CLOSE_TAG,
  TOKENIZER_CONTEXT_ATTRIBUTES,
  TOKENIZER_CONTEXT_ATTRIBUTE_KEY,
  TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_END,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE
} = require('./constants/tokenizer-contexts')

const contextsMap = {
  [TOKENIZER_CONTEXT_DATA]: dataContext,
  [TOKENIZER_CONTEXT_OPEN_TAG_START]: openTagStartContext,
  [TOKENIZER_CONTEXT_OPEN_TAG_END]: openTagEndContext,
  [TOKENIZER_CONTEXT_CLOSE_TAG]: closeTagContext,
  [TOKENIZER_CONTEXT_ATTRIBUTES]: attributesContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_KEY]: attributeKeyContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT]: attributeAssignmentContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE]: attributeValueContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START]: attributeValueStartQuoteContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE]: attributeValueQuotedContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END]: attributeValueEndQuoteContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START]: attributeValueStartApostropheContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE]: attributeValueApostropheContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_END]: attributeValueEndApostropheContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE]: attributeValueBareContext
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
  // \u0003 — special symbol to indicate end of file.
  // When parser will be transformed to support streaming
  // it won't be necessary, as stream will signal when
  // pushed all the characters.
  let chars = [...content, "\u0003"]
  let initialState = {
    currentContextType: TOKENIZER_CONTEXT_DATA,
    decisionBuffer: '',
    accumulatedContent: '',
    tokens: [],
    caretPosition: 0
  }

  let state = tokenizeChars(chars, initialState)

  return state.tokens
}
