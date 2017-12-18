const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_BARE_CONTEXT,
  ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  valueEnd (state, tokens, contextFactories, options) {
    const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
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
    state.currentContext = attributesContext
  }
}

const BARE_VALUE_END_PATTERN = /\s/

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (
    BARE_VALUE_END_PATTERN.test(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return (state, tokens) => syntaxHandlers.valueEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueBareContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_BARE_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
