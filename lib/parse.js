let clearContext = require('./helpers').clearContext

const parseTagContext = require('./parse-contexts/tag')
const parseTagContentContext = require('./parse-contexts/tag-content')
const parseTagNameContext = require('./parse-contexts/tag-name')
const parseAttributesContext = require('./parse-contexts/attributes')
const parseAttributeContext = require('./parse-contexts/attribute')
const parseAttributeValueContext = require('./parse-contexts/attribute-value')
const parseCommentContext = require('./parse-contexts/comment')
const parseDoctypeContext = require('./parse-contexts/doctype')
const parseDoctypeAttributesContext = require('./parse-contexts/doctype-attributes')

const {
  TAG_CONTENT_CONTEXT,
  TAG_CONTEXT,
  TAG_NAME_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT,
  COMMENT_CONTEXT,
  DOCTYPE_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('./constants/parser-contexts')

const parsersMap = {
  [TAG_CONTENT_CONTEXT]: parseTagContentContext,
  [TAG_CONTEXT]: parseTagContext,
  [TAG_NAME_CONTEXT]: parseTagNameContext,
  [ATTRIBUTES_CONTEXT]: parseAttributesContext,
  [ATTRIBUTE_CONTEXT]: parseAttributeContext,
  [ATTRIBUTE_VALUE_CONTEXT]: parseAttributeValueContext,
  [COMMENT_CONTEXT]: parseCommentContext,
  [DOCTYPE_CONTEXT]: parseDoctypeContext,
  [DOCTYPE_ATTRIBUTES_CONTEXT]: parseDoctypeAttributesContext
}

function parseTokens (tokens, state, positionOffset) {
  let tokenIndex = state.caretPosition - positionOffset

  while (tokenIndex < tokens.length) {
    let token = tokens[tokenIndex]
    let contextParse = parsersMap[state.currentContext.type]

    state = contextParse(token, state)
    tokenIndex = state.caretPosition - positionOffset
  }

  return state
}

module.exports = function parse (
  tokens = [],
  existingState,
  existingRootContext,
  { positionOffset } = {}
) {
  positionOffset = positionOffset === undefined ? 0 : positionOffset

  let rootContext = existingRootContext || {
    parentRef: undefined,
    type: TAG_CONTENT_CONTEXT,
    content: []
  }

  let state = existingState || {
    openedTagsPull: [],
    caretPosition: 0,
    currentContext: rootContext
  }

  parseTokens(tokens, state, positionOffset)

  const ast = clearContext(rootContext)

  return { state, rootContext, ast }
}
