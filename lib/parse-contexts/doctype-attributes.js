const {
  TOKEN_DOCTYPE_END,
  TOKEN_DOCTYPE_ATTRIBUTE
} = require('../constants/token-types')

function handleDoctypeEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttribute (state, token) {
  state.currentContext.content.push(token)
  state.caretPosition++

  return state
}

module.exports = function parseDoctypeAttributesContext (token, state) {
  if (token.type === TOKEN_DOCTYPE_END) {
    return handleDoctypeEnd(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE) {
    return handleAttribute(state, token)
  }

  state.caretPosition++

  return state
}
