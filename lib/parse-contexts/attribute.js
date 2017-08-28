function handleOpenTagEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttributeKey (state) {
  let alreadyHasKey = state.currentContext.content.some((item) => {
    return item.type === 'attribute-key'
  })

  if (alreadyHasKey) {
    state.currentContext = state.currentContext.parentRef

    return state
  }
}

function handleAttributeAssignment (state) {
  let alreadyHasValue = state.currentContext.content.some((item) => {
    return item.type === 'attribute-value'
  })

  if (alreadyHasValue) {
    state.currentContext = state.currentContext.parentRef

    return state
  }

  let tagAttributeValueContext = {
    parentRef: state.currentContext,
    type: 'attribute-value',
    content: []
  }

  state.currentContext.content.push(tagAttributeValueContext)
  state.currentContext = tagAttributeValueContext
  state.caretPosition++

  return state
}

module.exports = function parseAttributeContext (token, state) {
  let handlerResult

  if (token.type === 'open-tag-end') {
    handlerResult = handleOpenTagEnd(state)
  }

  if (token.type === 'attribute-key') {
    handlerResult = handleAttributeKey(state)
  }

  if (token.type === 'attribute-assignment') {
    handlerResult = handleAttributeAssignment(state)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
