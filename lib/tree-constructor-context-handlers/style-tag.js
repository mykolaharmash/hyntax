const {
  TOKEN_OPEN_TAG_START_STYLE,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_CLOSE_TAG_STYLE,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_STYLE_TAG_CONTENT
} = require('../constants/token-types')
const { ATTRIBUTES_CONTEXT } = require('../constants/tree-constructor-contexts')

function handleOpenTagStartStyle (state, token) {
  state.currentNode.content.openStart = token
  state.caretPosition++

  return state
}

function handleAttributeStartStyle (state) {
  state.currentContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTES_CONTEXT
  }

  return state
}

function handleOpenTagEndStyle (state, token) {
  state.currentNode.content.openEnd = token
  state.caretPosition++

  return state
}

function handleStyleContent (state, token) {
  state.currentNode.content.value = token
  state.caretPosition++

  return state
}

function handleCloseTagStyle (state, token) {
  state.currentNode.content.close = token
  state.currentNode = state.currentNode.parentRef
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function styleTag (token, state) {
  if (token.type === TOKEN_OPEN_TAG_START_STYLE) {
    return handleOpenTagStartStyle(state, token)
  }

  const ATTRIBUTE_START_TOKENS = [
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]

  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
    return handleAttributeStartStyle(state)
  }

  if (token.type === TOKEN_OPEN_TAG_END_STYLE) {
    return handleOpenTagEndStyle(state, token)
  }

  if (token.type === TOKEN_STYLE_TAG_CONTENT) {
    return handleStyleContent(state, token)
  }

  if (token.type === TOKEN_CLOSE_TAG_STYLE) {
    return handleCloseTagStyle(state, token)
  }

  state.caretPosition++

  return state
}
