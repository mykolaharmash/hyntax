const {
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_OPEN_TAG_END_STYLE
} = require('../constants/token-types')
const {
  ATTRIBUTE_CONTEXT
} = require('../constants/tree-constructor-contexts')

function handlerAttributeStart (state) {
  if (state.currentNode.content.attributes === undefined) {
    state.currentNode.content.attributes = []
  }

  // new empty attribute
  state.currentNode.content.attributes.push({})

  state.currentContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTE_CONTEXT
  }

  return state
}

function handleOpenTagEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

module.exports = function attributes (token, state) {
  const ATTRIBUTE_START_TOKENS = [
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]

  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
    return handlerAttributeStart(state)
  }

  const ATTRIBUTES_END_TOKENS = [
    TOKEN_OPEN_TAG_END,
    TOKEN_OPEN_TAG_END_SCRIPT,
    TOKEN_OPEN_TAG_END_STYLE
  ]

  if (ATTRIBUTES_END_TOKENS.indexOf(token.type) !== -1) {
    return handleOpenTagEnd(state)
  }

  state.caretPosition++

  return state
}
