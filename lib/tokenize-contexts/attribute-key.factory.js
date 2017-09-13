let { addToken, update } = require('../helpers')

const { TOKEN_ATTRIBUTE_KEY } = require('../constants/token-types')
const {
  ATTRIBUTE_KEY_FACTORY,
  ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  keyEnd (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_KEY,
      content: state.accumulatedContent
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
    factoryName: ATTRIBUTE_KEY_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
