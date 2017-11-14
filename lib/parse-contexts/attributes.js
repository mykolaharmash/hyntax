const {
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_OPEN_TAG_END
} = require('../constants/token-types')
const {
  ATTRIBUTE_CONTEXT
} = require('../constants/parser-contexts')

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

module.exports = function parseAttributesContext (token, state) {
  const ATTRIBUTE_START_TOKENS = [
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]

  if (ATTRIBUTE_START_TOKENS.includes(token.type)) {
    return handlerAttributeStart(state)
  }

  if (token.type === TOKEN_OPEN_TAG_END) {
    return handleOpenTagEnd(state)
  }

  state.caretPosition++

  return state
}
