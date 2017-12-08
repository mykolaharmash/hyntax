const tag = require('./tree-constructor-context-handlers/tag')
const tagContent = require('./tree-constructor-context-handlers/tag-content')
const tagName = require('./tree-constructor-context-handlers/tag-name')
const attributes = require('./tree-constructor-context-handlers/attributes')
const attribute = require('./tree-constructor-context-handlers/attribute')
const attributeValue = require('./tree-constructor-context-handlers/attribute-value')
const comment = require('./tree-constructor-context-handlers/comment')
const doctype = require('./tree-constructor-context-handlers/doctype')
const doctypeAttributes = require('./tree-constructor-context-handlers/doctype-attributes')
const doctypeAttribute = require('./tree-constructor-context-handlers/doctype-attribute')
const scriptTag = require('./tree-constructor-context-handlers/script-tag')
const styleTag = require('./tree-constructor-context-handlers/style-tag')

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
} = require('./constants/tree-constructor-contexts')
const { NODE_DOCUMENT } = require('./constants/ast-nodes')

const contextsMap = {
  [TAG_CONTENT_CONTEXT]: tagContent,
  [TAG_CONTEXT]: tag,
  [TAG_NAME_CONTEXT]: tagName,
  [ATTRIBUTES_CONTEXT]: attributes,
  [ATTRIBUTE_CONTEXT]: attribute,
  [ATTRIBUTE_VALUE_CONTEXT]: attributeValue,
  [COMMENT_CONTEXT]: comment,
  [DOCTYPE_CONTEXT]: doctype,
  [DOCTYPE_ATTRIBUTES_CONTEXT]: doctypeAttributes,
  [DOCTYPE_ATTRIBUTE_CONTEXT]: doctypeAttribute,
  [SCRIPT_TAG_CONTEXT]: scriptTag,
  [STYLE_TAG_CONTEXT]: styleTag
}

function processTokens (tokens, state, positionOffset) {
  let tokenIndex = state.caretPosition - positionOffset

  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex]
    const contextHandler = contextsMap[state.currentContext.type]

    state = contextHandler(token, state)
    tokenIndex = state.caretPosition - positionOffset
  }

  return state
}

module.exports = function constructTree (
  tokens = [],
  existingState
) {
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

  const positionOffset = state.caretPosition

  processTokens(tokens, state, positionOffset)

  return { state, ast: state.rootNode }
}
