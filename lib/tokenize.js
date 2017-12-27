const dataContext = require('./tokenizer-context-handlers/data')
const openTagStartContext = require('./tokenizer-context-handlers/open-tag-start')
const closeTagContext = require('./tokenizer-context-handlers/close-tag')
const openTagEndContext = require('./tokenizer-context-handlers/open-tag-end')
const attributesContext = require('./tokenizer-context-handlers/attributes')
const attributeKeyContext = require('./tokenizer-context-handlers/attribute-key')
const attributeValueContext = require('./tokenizer-context-handlers/attribute-value')
const attributeValueBareContext = require('./tokenizer-context-handlers/attribute-value-bare')
const attributeValueWrappedContext = require('./tokenizer-context-handlers/attribute-value-wrapped')
const scriptContentContext = require('./tokenizer-context-handlers/script-tag-content')
const styleContentContext = require('./tokenizer-context-handlers/style-tag-content')
const doctypeStartContext = require('./tokenizer-context-handlers/doctype-start')
const doctypeEndContextFactory = require('./tokenizer-context-handlers/doctype-end')
const doctypeAttributesContext = require('./tokenizer-context-handlers/doctype-attributes')
const doctypeAttributeWrappedContext = require('./tokenizer-context-handlers/doctype-attribute-wrapped')
const doctypeAttributeBareEndContext = require('./tokenizer-context-handlers/doctype-attribute-bare')
const commentContentContext = require('./tokenizer-context-handlers/comment-content')

const {
  DATA_CONTEXT,
  OPEN_TAG_START_CONTEXT,
  CLOSE_TAG_CONTEXT,
  ATTRIBUTES_CONTEXT,
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTE_KEY_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT,
  ATTRIBUTE_VALUE_BARE_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
  SCRIPT_CONTENT_CONTEXT,
  STYLE_CONTENT_CONTEXT,
  DOCTYPE_START_CONTEXT,
  DOCTYPE_END_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  COMMENT_CONTENT_CONTEXT,
} = require('./constants/tokenizer-contexts')

const contextHandlersMap = {
  [DATA_CONTEXT]: dataContext,
  [OPEN_TAG_START_CONTEXT]: openTagStartContext,
  [CLOSE_TAG_CONTEXT]: closeTagContext,
  [ATTRIBUTES_CONTEXT]: attributesContext,
  [OPEN_TAG_END_CONTEXT]: openTagEndContext,
  [ATTRIBUTE_KEY_CONTEXT]: attributeKeyContext,
  [ATTRIBUTE_VALUE_CONTEXT]: attributeValueContext,
  [ATTRIBUTE_VALUE_BARE_CONTEXT]: attributeValueBareContext,
  [ATTRIBUTE_VALUE_WRAPPED_CONTEXT]: attributeValueWrappedContext,
  [SCRIPT_CONTENT_CONTEXT]: scriptContentContext,
  [STYLE_CONTENT_CONTEXT]: styleContentContext,
  [DOCTYPE_START_CONTEXT]: doctypeStartContext,
  [DOCTYPE_END_CONTEXT]: doctypeEndContextFactory,
  [DOCTYPE_ATTRIBUTES_CONTEXT]: doctypeAttributesContext,
  [DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT]: doctypeAttributeWrappedContext,
  [DOCTYPE_ATTRIBUTE_BARE_CONTEXT]: doctypeAttributeBareEndContext,
  [COMMENT_CONTENT_CONTEXT]: commentContentContext
}

function tokenizeChars (
  chars,
  state,
  tokens,
  { isFinalChunk, positionOffset }
) {
  let charIndex = state.caretPosition - positionOffset

  while (charIndex < chars.length) {
    const context = contextHandlersMap[state.currentContext]

    state.decisionBuffer += chars[charIndex]
    context.parseSyntax(state.decisionBuffer, state, tokens)

    charIndex = state.caretPosition - positionOffset
  }

  if (isFinalChunk) {
    const context = contextHandlersMap[state.currentContext]

    // Move the caret back, as at this point
    // it in the position outside of chars array,
    // and it should not be taken into account
    // when calculating characters range
    state.caretPosition--

    if (context.handleContentEnd !== undefined) {
      context.handleContentEnd(state, tokens)
    }
  }
}

function tokenize (
  content = '',
  existingState,
  { isFinalChunk } = {}
) {
  isFinalChunk = isFinalChunk === undefined ? true : isFinalChunk

  let state

  if (existingState !== undefined) {
    state = Object.assign({}, existingState)
  } else {
    state = {
      currentContext: DATA_CONTEXT,
      contextParams: {},
      decisionBuffer: '',
      accumulatedContent: '',
      caretPosition: 0
    }
  }

  const chars = state.decisionBuffer + content
  const tokens = []

  const positionOffset = state.caretPosition - state.decisionBuffer.length

  tokenizeChars(chars, state, tokens, {
    isFinalChunk,
    positionOffset
  })

  return { state, tokens }
}

module.exports = tokenize
