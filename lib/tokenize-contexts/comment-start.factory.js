const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_COMMENT_START
} = require('../constants/token-types')
const {
  COMMENT_START_CONTEXT,
  COMMENT_CONTENT_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  commentStart (state, tokens, contextFactories) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const commentContentContext = contextFactories[COMMENT_CONTENT_CONTEXT](
      contextFactories
    )

    tokens.push({
      type: TOKEN_COMMENT_START,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.decisionBuffer = ''
    state.currentContext = commentContentContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
  ) {
    /**
     * Signals to wait for more characters in
     * the decision buffer to decide about syntax
     */
    return () => {}
  }

  if (chars === '<!--') {
    return (state, tokens) => syntaxHandlers.commentStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function commentStartContextFactory (contextFactories, options) {
  return {
    factoryName: COMMENT_START_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
