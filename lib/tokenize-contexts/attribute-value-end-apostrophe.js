let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_APOSTROPHE_END
} = require('../constants/token-types')


let syntaxHandlers = {
  apostrophe (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_APOSTROPHE_END,
      content: state.decisionBuffer
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTES
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars) {
  if (chars === '\'') {
    return syntaxHandlers.apostrophe
  }
}

module.exports = {
  parseSyntax
}
