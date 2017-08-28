function handleTagOpenStart (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

module.exports = function parseTagNameContext (token, state) {
  let handlerResult

  if (token.type !== 'open-tag-start') {
    handlerResult = handleTagOpenStart(state)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
