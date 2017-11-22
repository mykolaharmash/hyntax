const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_COMMENT_START
} = require('../constants/token-types')
const {
  COMMENT_START_CONTEXT,
  COMMENT_CONTENT_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  commentStart (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const commentContentContext = contextFactories[COMMENT_CONTENT_CONTEXT](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_COMMENT_START,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: commentContentContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
  ) {
    return (state, tokens) => syntaxHandlers.undecided(
      state,
      tokens,
      contextFactories,
      options
    )
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
