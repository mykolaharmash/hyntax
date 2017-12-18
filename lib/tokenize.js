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
  DATA_CONTEXT,
  OPEN_TAG_START_CONTEXT,
  CLOSE_TAG_CONTEXT,
  ATTRIBUTES_CONTEXT,
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTE_ASSIGNMENT_CONTEXT,
  ATTRIBUTE_KEY_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_START_CONTEXT,
  ATTRIBUTE_VALUE_BARE_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_END_CONTEXT,
  SCRIPT_CONTENT_CONTEXT,
  STYLE_CONTENT_CONTEXT,
  DOCTYPE_START_CONTEXT,
  DOCTYPE_END_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_END_CONTEXT,
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  COMMENT_START_CONTEXT,
  COMMENT_CONTENT_CONTEXT,
  COMMENT_END_CONTEXT
} = require('./constants/tokenizer-contexts')

const contextFactoriesMap = {
  [DATA_CONTEXT]: dataContextFactory,
  [OPEN_TAG_START_CONTEXT]: openTagStartContextFactory,
  [CLOSE_TAG_CONTEXT]: closeTagContextFactory,
  [ATTRIBUTES_CONTEXT]: attributesContextFactory,
  [OPEN_TAG_END_CONTEXT]: openTagEndContextFactory,
  [ATTRIBUTE_ASSIGNMENT_CONTEXT]: attributeAssignmentContextFactory,
  [ATTRIBUTE_KEY_CONTEXT]: attributeKeyContextFactory,
  [ATTRIBUTE_VALUE_CONTEXT]: attributeValueContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_START_CONTEXT]: attributeValueWrappedStartContextFactory,
  [ATTRIBUTE_VALUE_BARE_CONTEXT]: attributeValueBareContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_CONTEXT]: attributeValueWrappedContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_END_CONTEXT]: attributeValueWrappedEndContextFactory,
  [SCRIPT_CONTENT_CONTEXT]: scriptContentContextFactory,
  [STYLE_CONTENT_CONTEXT]: styleContentContextFactory,
  [DOCTYPE_START_CONTEXT]: doctypeStartContextFactory,
  [DOCTYPE_END_CONTEXT]: doctypeEndContextFactory,
  [DOCTYPE_ATTRIBUTES_CONTEXT]: doctypeAttributesContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT]: doctypeAttributeWrappedStartContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT]: doctypeAttributeWrappedContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_END_CONTEXT]: doctypeAttributeWrappedEndContextFactory,
  [DOCTYPE_ATTRIBUTE_BARE_CONTEXT]: doctypeAttributeBareEndContextFactory,
  [COMMENT_START_CONTEXT]: commentStartContextFactory,
  [COMMENT_CONTENT_CONTEXT]: commentContentContextFactory,
  [COMMENT_END_CONTEXT]: commentEndContextFactory
}

function tokenizeChars (
  chars,
  state,
  tokens,
  { isFinalChunk, positionOffset }
) {
  let charIndex = state.caretPosition - positionOffset

  while (charIndex < chars.length) {
    state.decisionBuffer += chars[charIndex]

    const syntaxHandler = state.currentContext.parseSyntax(state.decisionBuffer)

    if (syntaxHandler === undefined) {
      state.accumulatedContent += state.decisionBuffer
      state.decisionBuffer = ''
    } else {
      syntaxHandler(state, tokens)
    }

    state.caretPosition++
    charIndex = state.caretPosition - positionOffset
  }

  if (isFinalChunk) {
    // Move the caret back, as at this point
    // it in the position outside of chars array,
    // and it should not be taken into account
    // when calculating characters range
    state.caretPosition--

    const contentEndHandler = state.currentContext.handleContentEnd

    if (contentEndHandler !== undefined) {
      contentEndHandler(state, tokens)
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
      currentContext: dataContextFactory(contextFactoriesMap),
      decisionBuffer: '',
      accumulatedContent: '',
      caretPosition: 0
    }
  }

  const decisionBufferChars = [...state.decisionBuffer]
  const contentChars = [...content]
  const chars = decisionBufferChars.concat(contentChars)
  const tokens = []

  const positionOffset = state.caretPosition - decisionBufferChars.length

  tokenizeChars(chars, state, tokens, {
    isFinalChunk,
    positionOffset
  })

  return { state, tokens }
}

module.exports = tokenize
