const { addToken, update, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_END_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const doctypeAttributeWrappedEndContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_END_CONTEXT](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributeWrappedEndContext
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

module.exports = function doctypeAttributeWrappedContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
