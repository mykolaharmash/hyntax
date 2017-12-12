const { addToken, update, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_END_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const doctypeAttributesContext = contextFactories[DOCTYPE_ATTRIBUTES_CONTEXT](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: doctypeAttributesContext
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

module.exports = function doctypeAttributeWrappedEndContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_WRAPPED_END_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
