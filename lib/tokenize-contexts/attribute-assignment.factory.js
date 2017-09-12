let { addToken, update } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const attributeValueContextFactory = require('./attribute-value.factory')

const syntaxHandlers = {
    equal (state, tokens, options) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: TOKEN_ATTRIBUTE_ASSIGNMENT,
        content: `${ state.accumulatedContent }${ state.decisionBuffer }`
      })

      updatedState = update(state, {
        accumulatedContent: '',
        decisionBuffer: '',
        currentContext: attributeValueContextFactory(options)
      })

      return { updatedState, updatedTokens }
    },
  }

function parseSyntax (chars, syntaxHandlers, options) {
  if (chars === '=') {
    return (state, tokens) => syntaxHandlers.equal(
      state,
      tokens,
      options
    )
  }
}

module.exports = function attributeKeyContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
