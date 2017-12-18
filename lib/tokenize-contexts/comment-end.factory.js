const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_COMMENT_END
} = require('../constants/token-types')
const {
  COMMENT_END_CONTEXT,
  DATA_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  commentEnd (state, tokens, contextFactories) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const dataContext = contextFactories[DATA_CONTEXT](
      contextFactories
    )

    tokens.push({
      type: TOKEN_COMMENT_END,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.decisionBuffer = ''
    state.currentContext = dataContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.commentEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function commentEndContextFactory (contextFactories, options) {
  return {
    factoryName: COMMENT_END_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
