const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_END_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    const attributeValueWrappedEndContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_END_CONTEXT](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    tokens.push({
      type: TOKEN_ATTRIBUTE_VALUE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributeValueWrappedEndContext
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
    factoryName: ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
