let { addToken, update } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const attributeValueWrappedEndContextFactory = require('./attribute-value-wrapped-end.factory')

const syntaxHandlers = {
  wrapper (state, tokens, options) {
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
      currentContext: attributeValueWrappedEndContextFactory(options)
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

module.exports = function attributeValueWrappedContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
