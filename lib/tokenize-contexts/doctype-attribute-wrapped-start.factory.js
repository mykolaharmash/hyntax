const { addToken, update, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const doctypeAttributeWrappedContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: doctypeAttributeWrappedContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributeWrappedStartContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
