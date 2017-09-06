let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_APOSTROPHE_START
} = require('../constants/token-types')


const syntaxHandlers = {
  apostrophe (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_APOSTROPHE_START,
      content: state.decisionBuffer
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE
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
