const { addToken, update } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')

const syntaxHandlers = {
  valueEnd (state, tokens, options) {
    const attributesContextFactory = require('./attributes.factory')

    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE,
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
  const BARE_VALUE_END_PATTERN = /\s/

  if (
    BARE_VALUE_END_PATTERN.test(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return (state, tokens) => syntaxHandlers.valueEnd(
      state,
      tokens,
      options
    )
  }
}

module.exports = function attributeValueBareContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
