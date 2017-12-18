const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_ATTRIBUTE_KEY } = require('../constants/token-types')
const {
  ATTRIBUTE_KEY_CONTEXT,
  ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  keyEnd (state, tokens, contextFactories, options) {
    const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    tokens.push({
      type: TOKEN_ATTRIBUTE_KEY,
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

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const KEY_BREAK_CHARS = [' ', '\n', '\t', '=', '/', '>']

  if (KEY_BREAK_CHARS.indexOf(chars) !== -1) {
    return (state, tokens) => syntaxHandlers.keyEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeKeyContextFactory (contextFactories, options) {
  return {
    factoryName: ATTRIBUTE_KEY_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
