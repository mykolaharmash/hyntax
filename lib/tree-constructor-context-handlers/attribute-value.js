const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../constants/token-types')

function getLastAttribute (state) {
  const attributes = state.currentNode.content.attributes

  return attributes[attributes.length - 1]
}

function handleValueEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttributeValue (state, token) {
  const attribute = getLastAttribute(state)

  attribute.value = token
  state.caretPosition++

  return state
}

function handleAttributeValueWrapperStart (state, token) {
  const attribute = getLastAttribute(state)

  attribute.startWrapper = token
  state.caretPosition++

  return state
}

function handleAttributeValueWrapperEnd (state, token) {
  const attribute = getLastAttribute(state)

  attribute.endWrapper = token
  state.caretPosition++

  return state
}

module.exports = function attributeValue (token, state) {
  const VALUE_END_TOKENS = [
    TOKEN_OPEN_TAG_END,
    TOKEN_OPEN_TAG_END_SCRIPT,
    TOKEN_OPEN_TAG_END_STYLE,
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]

  if (VALUE_END_TOKENS.indexOf(token.type) !== -1) {
    return handleValueEnd(state)
  }

  if (token.type === TOKEN_ATTRIBUTE_VALUE) {
    return handleAttributeValue(state, token)
  }

  if (token.type === TOKEN_ATTRIBUTE_VALUE_WRAPPER_START) {
    return handleAttributeValueWrapperStart(state, token)
  }

  if (token.type === TOKEN_ATTRIBUTE_VALUE_WRAPPER_END) {
    return handleAttributeValueWrapperEnd(state, token)
  }

  state.caretPosition++

  return state
}
