const {
  TOKEN_DOCTYPE_END,
  TOKEN_DOCTYPE_ATTRIBUTE,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END
} = require('../constants/token-types')

function getLastAttribute (state) {
  const attributes = state.currentNode.content.attributes

  return attributes[attributes.length - 1]
}

function handleDoctypeEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttributeValue (state, token) {
  const attribute = getLastAttribute(state)

  if (attribute.value !== undefined) {
    state.currentContext = state.currentContext.parentRef

    return state
  }

  attribute.value = token
  state.caretPosition++

  return state
}

function handleAttributeWrapperStart (state, token) {
  const attribute = getLastAttribute(state)

  if (attribute.start !== undefined || attribute.value !== undefined) {
    state.currentContext = state.currentContext.parentRef

    return state
  }

  attribute.startWrapper = token
  state.caretPosition++

  return state
}

function handleAttributeWrapperEnd (state, token) {
  const attribute = getLastAttribute(state)

  attribute.endWrapper = token
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function doctypeAttribute (token, state) {
  if (token.type === TOKEN_DOCTYPE_END) {
    return handleDoctypeEnd(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START) {
    return handleAttributeWrapperStart(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END) {
    return handleAttributeWrapperEnd(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_ATTRIBUTE) {
    return handleAttributeValue(state, token)
  }

  state.caretPosition++

  return state
}
