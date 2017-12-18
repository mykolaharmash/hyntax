const {
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_SCRIPT_TAG_CONTENT
} = require('../constants/token-types')
const { ATTRIBUTES_CONTEXT } = require('../constants/tree-constructor-contexts')

function handleOpenTagStartScript (state, token) {
  state.currentNode.content.openStart = token
  state.caretPosition++

  return state
}

function handleAttributeStartScript (state) {
  state.currentContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTES_CONTEXT
  }

  return state
}

function handleOpenTagEndScript (state, token) {
  state.currentNode.content.openEnd = token
  state.caretPosition++

  return state
}

function handleScriptContent (state, token) {
  state.currentNode.content.value = token
  state.caretPosition++

  return state
}

function handleCloseTagScript (state, token) {
  state.currentNode.content.close = token
  state.currentNode = state.currentNode.parentRef
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function scriptTag (token, state) {
  if (token.type === TOKEN_OPEN_TAG_START_SCRIPT) {
    return handleOpenTagStartScript(state, token)
  }

  const ATTRIBUTE_START_TOKENS = [
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]

  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
    return handleAttributeStartScript(state)
  }


  if (token.type === TOKEN_OPEN_TAG_END_SCRIPT) {
    return handleOpenTagEndScript(state, token)
  }

  if (token.type === TOKEN_SCRIPT_TAG_CONTENT) {
    return handleScriptContent(state, token)
  }

  if (token.type === TOKEN_CLOSE_TAG_SCRIPT) {
    return handleCloseTagScript(state, token)
  }

  state.caretPosition++

  return state
}
