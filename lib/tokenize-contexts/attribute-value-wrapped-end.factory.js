let { addToken, update } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../constants/token-types')

const syntaxHandlers = {
  wrapper (state, tokens, options) {
    const attributesContextFactory = require('./attributes.factory')

    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: state.decisionBuffer
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributesContextFactory(options)
    })

    return { updatedState, updatedTokens }
  }
}


function parseSyntax (chars, syntaxHandlers, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      options
    )
  }
}

module.exports = function attributeValueWrappedEndContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
