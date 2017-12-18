const {
  TOKEN_DOCTYPE_END,
  TOKEN_DOCTYPE_ATTRIBUTE,
  TOKEN_DOCTYPE_START,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/tree-constructor-contexts')

function handleDoctypeStart (state, token) {
  state.currentNode.content.start = token
  state.caretPosition++

  return state
}

function handleDoctypeEnd (state, token) {
  state.currentNode.content.end = token
  state.currentNode = state.currentNode.parentRef
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

function handleDoctypeAttributes (state) {
  state.currentContext = {
    parentRef: state.currentContext,
    type: DOCTYPE_ATTRIBUTES_CONTEXT
  }

  return state
}

module.exports = function doctype (token, state) {
  if (token.type === TOKEN_DOCTYPE_START) {
    return handleDoctypeStart(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_END) {
    return handleDoctypeEnd(state, token)
  }

  const ATTRIBUTES_START_TOKENS = [
    TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    TOKEN_DOCTYPE_ATTRIBUTE
  ]

  if (ATTRIBUTES_START_TOKENS.indexOf(token.type) !== -1) {
    return handleDoctypeAttributes(state, token)
  }

  state.caretPosition++

  return state
}
