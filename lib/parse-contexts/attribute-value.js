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
    'open-tag-end',
    'attribute-key',
    'attribute-assignment'
  ]
  let handlerResult

  if (VALUE_END_TOKENS.includes(token.type)) {
    handlerResult = handleValueEnd(state)
  }

  const VALUE_TYPE_TOKENS = [
    'attribute-value-quoted',
    'attribute-value-apostrophe',
    'attribute-value-bare'
  ]

  if (VALUE_TYPE_TOKENS.includes(token.type)) {
    handlerResult = handleAttributeValue(state, token)
  }

  if (!handlerResult) {
    state.caretPosition++
  }

  return state
}
