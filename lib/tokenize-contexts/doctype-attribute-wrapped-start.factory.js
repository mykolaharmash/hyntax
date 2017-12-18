const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const doctypeAttributeWrappedContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT](
      contextFactories,
      options
    )

    tokens.push({
      type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.decisionBuffer = ''
    state.currentContext = doctypeAttributeWrappedContext
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
