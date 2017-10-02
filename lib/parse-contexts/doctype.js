const {
  TOKEN_DOCTYPE_END,
  TOKEN_DOCTYPE_ATTRIBUTE,
  TOKEN_DOCTYPE_START
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/parser-contexts')

function handleDoctypeStart (state, token) {
  state.currentContext.content.push(token)
  state.caretPosition++

  return state
}

function handleDoctypeEnd (state) {
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

function handleDoctypeAttributes (state) {
  let attributesContext = {
    parentRef: state.currentContext,
    type: DOCTYPE_ATTRIBUTES_CONTEXT,
    content: []
  }

  state.currentContext.content.push(attributesContext)
  state.currentContext = attributesContext

  return state
}

module.exports = function parseDoctypeContext (token, state) {
  if (token.type === TOKEN_DOCTYPE_START) {
    return handleDoctypeStart(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_END) {
    return handleDoctypeEnd(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE) {
    return handleDoctypeAttributes(state, token)
  }

  state.caretPosition++

  return state
}
