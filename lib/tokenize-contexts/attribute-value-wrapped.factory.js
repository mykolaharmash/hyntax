const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributeValueWrappedEndContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_END_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueWrappedEndContext
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

module.exports = function attributeValueWrappedContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_WRAPPED_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
