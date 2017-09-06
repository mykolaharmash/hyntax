let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_END
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_APOSTROPHE
} = require('../constants/token-types')

let syntaxHandlers = {
  apostrophe (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_APOSTROPHE,
      content: state.accumulatedContent
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_END
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
