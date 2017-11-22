const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const { TOKEN_ATTRIBUTE_KEY } = require('../constants/token-types')
const {
  ATTRIBUTE_KEY_CONTEXT,
  ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  keyEnd (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_KEY,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const KEY_BREAK_CHARS = [' ', '\n', '\t', '=', '/', '>']

  if (KEY_BREAK_CHARS.includes(chars)) {
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
