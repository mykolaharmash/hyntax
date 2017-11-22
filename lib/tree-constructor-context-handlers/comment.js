const {
  TOKEN_COMMENT_START,
  TOKEN_COMMENT_END,
  TOKEN_COMMENT_CONTENT
} = require('../constants/token-types')

function handleCommentStart (state, token) {
  state.currentNode.content.start = token
  state.caretPosition++

  return state
}

function handleCommentContent (state, token) {
  state.currentNode.content.value = token
  state.caretPosition++

  return state
}

function handleCommentEnd (state, token) {
  state.currentNode.content.end = token
  state.currentNode = state.currentNode.parentRef
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function comment (token, state) {
  if (token.type === TOKEN_COMMENT_START) {
    return handleCommentStart(state, token)
  }

  if (token.type === TOKEN_COMMENT_CONTENT) {
    return handleCommentContent(state, token)
  }

  if (token.type === TOKEN_COMMENT_END) {
    return handleCommentEnd(state, token)
  }

  state.caretPosition++

  return state
}
