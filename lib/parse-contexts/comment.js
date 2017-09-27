const {
  TOKEN_COMMENT_END,
  TOKEN_COMMENT_CONTENT
} = require('../constants/token-types')

function handleCommentContent (state, token) {
  state.currentContext.content.push(token)
  state.caretPosition++

  return state
}

function handleCommentEnd (state) {
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function parseTagContentContext (token, state) {
  if (token.type === TOKEN_COMMENT_CONTENT) {
    return handleCommentContent(state, token)
  }

  if (token.type === TOKEN_COMMENT_END) {
    return handleCommentEnd(state, token)
  }

  state.caretPosition++

  return state
}
