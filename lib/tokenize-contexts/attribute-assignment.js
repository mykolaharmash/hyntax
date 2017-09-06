let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')

let syntaxHandlers = {
  equal (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE
    })

    return { updatedState, updatedTokens }
  },
}

function parseSyntax (chars) {
  if (chars === '=') {
    return syntaxHandlers.equal
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
