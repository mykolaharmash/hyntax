function handlerAttributeStart (state) {
  let tagAttributeItemContext = {
    parentRef: state.currentContext,
    type: 'attribute',
    content: []
  }

  state.currentContext.content.push(tagAttributeItemContext)
  state.currentContext = tagAttributeItemContext

  return state
}

function handleOpenTagEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

module.exports = function parseAttributesContext (token, state) {
  const ATTRIBUTE_START_TOKENS = [
    'attribute-key',
    'attribute-assignment'
  ]
  let handlerResult

  if (ATTRIBUTE_START_TOKENS.includes(token.type)) {
    handlerResult = handlerAttributeStart(state)
  }

  if (token.type === 'open-tag-end') {
    handlerResult = handleOpenTagEnd(state)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
