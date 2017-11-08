const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_DOCTYPE_END
} = require('../constants/token-types')

const {
  DOCTYPE_END_FACTORY,
  DATA_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  closingCornerBrace(state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    const dataContext = contextFactories[DATA_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_END,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: dataContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeEndContextFactory (contextFactories, options) {
  return {
    factoryName: DOCTYPE_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}