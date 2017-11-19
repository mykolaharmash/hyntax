const dataContextFactory = require('./tokenize-contexts/data.factory')
const openTagStartContextFactory = require('./tokenize-contexts/open-tag-start.factory')
const closeTagContextFactory = require('./tokenize-contexts/close-tag.factory')
const openTagEndContextFactory = require('./tokenize-contexts/open-tag-end.factory')
const attributesContextFactory = require('./tokenize-contexts/attributes.factory')
const attributeAssignmentContextFactory = require('./tokenize-contexts/attribute-assignment.factory')
const attributeKeyContextFactory = require('./tokenize-contexts/attribute-key.factory')
const attributeValueContextFactory = require('./tokenize-contexts/attribute-value.factory')
const attributeValueWrappedStartContextFactory = require('./tokenize-contexts/attribute-value-wrapped-start.factory')
const attributeValueBareContextFactory = require('./tokenize-contexts/attribute-value-bare.factory')
const attributeValueWrappedContextFactory = require('./tokenize-contexts/attribute-value-wrapped.factory')
const attributeValueWrappedEndContextFactory = require('./tokenize-contexts/attribute-value-wrapped-end.factory')
const scriptContentContextFactory = require('./tokenize-contexts/script-tag-content.factory')
const styleContentContextFactory = require('./tokenize-contexts/style-tag-content.factory')
const doctypeStartContextFactory = require('./tokenize-contexts/doctype-start.factory')
const doctypeEndContextFactory = require('./tokenize-contexts/doctype-end.factory')
const doctypeAttributesContextFactory = require('./tokenize-contexts/doctype-attributes.factory')
const doctypeAttributeWrappedStartContextFactory = require('./tokenize-contexts/doctype-attribute-wrapped-start.factory')
const doctypeAttributeWrappedContextFactory = require('./tokenize-contexts/doctype-attribute-wrapped.factory')
const doctypeAttributeWrappedEndContextFactory = require('./tokenize-contexts/doctype-attribute-wrapped-end.factory')
const doctypeAttributeBareEndContextFactory = require('./tokenize-contexts/doctype-attribute-bare.factory')
const commentStartContextFactory = require('./tokenize-contexts/comment-start.factory')
const commentContentContextFactory = require('./tokenize-contexts/comment-content.factory')
const commentEndContextFactory = require('./tokenize-contexts/comment-end.factory')

const {
  DATA_FACTORY,
  OPEN_TAG_START_FACTORY,
  CLOSE_TAG_FACTORY,
  ATTRIBUTES_FACTORY,
  OPEN_TAG_END_FACTORY,
  ATTRIBUTE_ASSIGNMENT_FACTORY,
  ATTRIBUTE_KEY_FACTORY,
  ATTRIBUTE_VALUE_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
  ATTRIBUTE_VALUE_BARE_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_END_FACTORY,
  SCRIPT_CONTENT_FACTORY,
  STYLE_CONTENT_FACTORY,
  DOCTYPE_START_FACTORY,
  DOCTYPE_END_FACTORY,
  DOCTYPE_ATTRIBUTES_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY,
  DOCTYPE_ATTRIBUTE_BARE_FACTORY,
  COMMENT_START_FACTORY,
  COMMENT_CONTENT_FACTORY,
  COMMENT_END_FACTORY
} = require('./constants/tokenizer-context-factories')

const contextFactoriesMap = {
  [DATA_FACTORY]: dataContextFactory,
  [OPEN_TAG_START_FACTORY]: openTagStartContextFactory,
  [CLOSE_TAG_FACTORY]: closeTagContextFactory,
  [ATTRIBUTES_FACTORY]: attributesContextFactory,
  [OPEN_TAG_END_FACTORY]: openTagEndContextFactory,
  [ATTRIBUTE_ASSIGNMENT_FACTORY]: attributeAssignmentContextFactory,
  [ATTRIBUTE_KEY_FACTORY]: attributeKeyContextFactory,
  [ATTRIBUTE_VALUE_FACTORY]: attributeValueContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_START_FACTORY]: attributeValueWrappedStartContextFactory,
  [ATTRIBUTE_VALUE_BARE_FACTORY]: attributeValueBareContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_FACTORY]: attributeValueWrappedContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_END_FACTORY]: attributeValueWrappedEndContextFactory,
  [SCRIPT_CONTENT_FACTORY]: scriptContentContextFactory,
  [STYLE_CONTENT_FACTORY]: styleContentContextFactory,
  [DOCTYPE_START_FACTORY]: doctypeStartContextFactory,
  [DOCTYPE_END_FACTORY]: doctypeEndContextFactory,
  [DOCTYPE_ATTRIBUTES_FACTORY]: doctypeAttributesContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY]: doctypeAttributeWrappedStartContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY]: doctypeAttributeWrappedContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY]: doctypeAttributeWrappedEndContextFactory,
  [DOCTYPE_ATTRIBUTE_BARE_FACTORY]: doctypeAttributeBareEndContextFactory,
  [COMMENT_START_FACTORY]: commentStartContextFactory,
  [COMMENT_CONTENT_FACTORY]: commentContentContextFactory,
  [COMMENT_END_FACTORY]: commentEndContextFactory
}

function handleSyntaxForBuffer (state, tokens) {
  const syntaxHandler = state.currentContext.parseSyntax(state.decisionBuffer)

  if (syntaxHandler) {
    return syntaxHandler(state, tokens)
  }

  return undefined
}

function handleContentEnd (state, tokens) {
  if (state.currentContext.handleContentEnd) {
    return state.currentContext.handleContentEnd(state, tokens)
  }

  return undefined
}


function tokenizeChars (
  chars,
  state,
  tokens,
  { isFinalChunk, positionOffset }
) {
  let updatedState = Object.assign({}, state)
  let updatedTokens = tokens
  let charIndex = state.caretPosition - positionOffset

  while (charIndex < chars.length) {
    updatedState.decisionBuffer += chars[charIndex]

    const handlerResult = handleSyntaxForBuffer(updatedState, tokens)

    if (handlerResult === undefined) {
      updatedState.accumulatedContent += updatedState.decisionBuffer
      updatedState.decisionBuffer = ''
    } else {
      updatedState = handlerResult.updatedState
      updatedTokens = handlerResult.updatedTokens
    }

    updatedState.caretPosition++
    charIndex = updatedState.caretPosition - positionOffset
  }

  if (isFinalChunk) {
    // Move the caret back, as at this point
    // it in the position outside of chars array,
    // and it should not be taken into account
    // when calculating characters range
    updatedState.caretPosition--

    const handlerResult = handleContentEnd(updatedState, tokens)

    if (handlerResult !== undefined) {
      updatedState = handlerResult.updatedState
      updatedTokens = handlerResult.updatedTokens
    }
  }

  return { updatedState, updatedTokens }
}

function tokenize (
  content = '',
  existingState,
  { isFinalChunk } = {}
) {
  isFinalChunk = isFinalChunk === undefined ? true : isFinalChunk

  const state = existingState || {
    currentContext: dataContextFactory(contextFactoriesMap),
    decisionBuffer: '',
    accumulatedContent: '',
    caretPosition: 0
  }

  const decisionBufferChars = [...state.decisionBuffer]
  const contentChars = [...content]
  const chars = decisionBufferChars.concat(contentChars)
  const tokens = []

  const positionOffset = state.caretPosition - decisionBufferChars.length

  const result = tokenizeChars(chars, state, tokens, {
    isFinalChunk,
    positionOffset
  })

  return {
    state: result.updatedState,
    tokens: result.updatedTokens
  }
}

module.exports = tokenize
