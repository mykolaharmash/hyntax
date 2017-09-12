let { addToken, update } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START
} = require('../constants/token-types')
const attributeValueWrappedContextFactory = require('./attribute-value-wrapped.factory')

const syntaxHandlers = {
  wrapper (state, tokens, options) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: state.decisionBuffer
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributeValueWrappedContextFactory(options)
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

module.exports = function attributeValueWrappedStartContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
