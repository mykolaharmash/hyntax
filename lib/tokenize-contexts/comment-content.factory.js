const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_COMMENT_CONTENT
} = require('../constants/token-types')
const {
  COMMENT_CONTENT_FACTORY,
  COMMENT_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  commentEnd (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const commentContentContext = contextFactories[COMMENT_END_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_COMMENT_CONTENT,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: commentContentContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '-' || chars === '--') {
    return (state, tokens) => syntaxHandlers.undecided(
      state,
      tokens,
      contextFactories,
      options
    )
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
    factoryName: COMMENT_CONTENT_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
