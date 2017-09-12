let { addToken, update } = require('../helpers')

const { TOKEN_ATTRIBUTE_KEY } = require('../constants/token-types')

const syntaxHandlers = {
  keyEnd (state, tokens, options) {
    const attributesContextFactory = require('./attributes.factory')

    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_KEY,
      content: state.accumulatedContent
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContextFactory(options)
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, options) {
  const KEY_BREAK_CHARS = [' ', '\n', '\t', '=', '/', '>']

  if (KEY_BREAK_CHARS.includes(chars)) {
    return (state, tokens) => syntaxHandlers.keyEnd(state, tokens, options)
  }
}

module.exports = function attributeKeyContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
