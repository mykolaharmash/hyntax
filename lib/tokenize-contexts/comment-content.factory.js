const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_COMMENT_CONTENT
} = require('../constants/token-types')
const {
  COMMENT_CONTENT_CONTEXT,
  COMMENT_END_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  commentEnd (state, tokens, contextFactories) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const commentContentContext = contextFactories[COMMENT_END_CONTEXT](
      contextFactories
    )

    tokens.push({
      type: TOKEN_COMMENT_CONTENT,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = commentContentContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '-' || chars === '--') {
    /**
     * Signals to wait for more characters in
     * the decision buffer to decide about syntax
     */
    return () => {}
  }

  if (chars === '-->') {
    return (state, tokens) => syntaxHandlers.commentEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function commentContentContextFactory (contextFactories, options) {
  return {
    factoryName: COMMENT_CONTENT_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
