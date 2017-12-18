const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_CONTEXT
} = require('../constants/tree-constructor-contexts')

function getLastAttribute (state) {
  const attributes = state.currentNode.content.attributes

  return attributes[attributes.length - 1]
}

function handleOpenTagEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttributeKey (state, token) {
  const attribute = getLastAttribute(state)

  if (attribute.key !== undefined || attribute.value !== undefined) {
    state.currentContext = state.currentContext.parentRef

    return state
  }

  attribute.key = token
  state.caretPosition++

  return state
}

function handleAttributeAssignment (state) {
  const attribute = getLastAttribute(state)

  if (attribute.value !== undefined) {
    state.currentContext = state.currentContext.parentRef

    return state
  }

  state.currentContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTE_VALUE_CONTEXT
  }
  state.caretPosition++

  return state
}

module.exports = function attribute (token, state) {
  const OPEN_TAG_END_TOKENS = [
    TOKEN_OPEN_TAG_END,
    TOKEN_OPEN_TAG_END_SCRIPT,
    TOKEN_OPEN_TAG_END_STYLE
  ]

  if (OPEN_TAG_END_TOKENS.indexOf(token.type) !== -1) {
    return handleOpenTagEnd(state)
  }

  if (token.type === TOKEN_ATTRIBUTE_KEY) {
    return handleAttributeKey(state, token)
  }

  if (token.type === TOKEN_ATTRIBUTE_ASSIGNMENT) {
    return handleAttributeAssignment(state)
  }

  state.caretPosition++

  return state
}
