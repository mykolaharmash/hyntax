const parseTagContext = require('./parse-contexts/tag')
const parseTagContentContext = require('./parse-contexts/tag-content')
const parseTagNameContext = require('./parse-contexts/tag-name')
const parseAttributesContext = require('./parse-contexts/attributes')
const parseAttributeContext = require('./parse-contexts/attribute')
const parseAttributeValueContext = require('./parse-contexts/attribute-value')
const parseCommentContext = require('./parse-contexts/comment')
const parseDoctypeContext = require('./parse-contexts/doctype')
const parseDoctypeAttributesContext = require('./parse-contexts/doctype-attributes')
const parseDoctypeAttributeContext = require('./parse-contexts/doctype-attribute')
const parseScriptTagContext = require('./parse-contexts/script-tag')
const parseStyleTagContext = require('./parse-contexts/style-tag')

const {
  TAG_CONTENT_CONTEXT,
  TAG_CONTEXT,
  TAG_NAME_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT,
  COMMENT_CONTEXT,
  DOCTYPE_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT,
  DOCTYPE_ATTRIBUTE_CONTEXT,
  SCRIPT_TAG_CONTEXT,
  STYLE_TAG_CONTEXT
} = require('./constants/parser-contexts')
const { NODE_DOCUMENT } = require('./constants/ast-nodes')

const parsersMap = {
  [TAG_CONTENT_CONTEXT]: parseTagContentContext,
  [TAG_CONTEXT]: parseTagContext,
  [TAG_NAME_CONTEXT]: parseTagNameContext,
  [ATTRIBUTES_CONTEXT]: parseAttributesContext,
  [ATTRIBUTE_CONTEXT]: parseAttributeContext,
  [ATTRIBUTE_VALUE_CONTEXT]: parseAttributeValueContext,
  [COMMENT_CONTEXT]: parseCommentContext,
  [DOCTYPE_CONTEXT]: parseDoctypeContext,
  [DOCTYPE_ATTRIBUTES_CONTEXT]: parseDoctypeAttributesContext,
  [DOCTYPE_ATTRIBUTE_CONTEXT]: parseDoctypeAttributeContext,
  [SCRIPT_TAG_CONTEXT]: parseScriptTagContext,
  [STYLE_TAG_CONTEXT]: parseStyleTagContext
}

function parseTokens (tokens, state, positionOffset) {
  let tokenIndex = state.caretPosition - positionOffset

  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex]
    const contextParse = parsersMap[state.currentContext.type]

    state = contextParse(token, state)
    tokenIndex = state.caretPosition - positionOffset
  }

  return state
}

module.exports = function parse (
  tokens = [],
  existingState,
  { positionOffset } = {}
) {
  positionOffset = positionOffset === undefined ? 0 : positionOffset

  let state = existingState

  if (existingState === undefined) {
    const rootContext = {
      type: TAG_CONTENT_CONTEXT,
      parentRef: undefined,
      content: []
    }
    const rootNode = {
      nodeType: NODE_DOCUMENT,
      parentRef: undefined,
      content: {}
    }

    state = {
      caretPosition: 0,
      currentContext: rootContext,
      currentNode: rootNode,
      rootNode
    }
  }

  parseTokens(tokens, state, positionOffset)

  return { state, ast: state.rootNode }
}
