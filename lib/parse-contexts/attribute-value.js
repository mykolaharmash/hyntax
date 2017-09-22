const {
  TOKEN_OPEN_TAG_END,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')

function handleValueEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttributeValue (state, token) {
  state.currentContext.content.push(token)
  state.caretPosition++

  return state
}

module.exports = function parseAttributeValueContext (token, state) {
  const VALUE_END_TOKENS = [
    TOKEN_OPEN_TAG_END,
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]
  let handlerResult

  if (VALUE_END_TOKENS.includes(token.type)) {
    handlerResult = handleValueEnd(state)
  }

  if (token.type === TOKEN_ATTRIBUTE_VALUE) {
    handlerResult = handleAttributeValue(state, token)
  }

  if (!handlerResult) {
    state.caretPosition++
  }

  return state
}
