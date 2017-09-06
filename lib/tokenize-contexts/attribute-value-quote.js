let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_QUOTE
} = require('../constants/token-types')

const syntaxHandlers = {
  quotationMark (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
      content: state.accumulatedContent
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars) {
  if (chars === '"') {
    return syntaxHandlers.quotationMark
  }
}

module.exports = {
  parseSyntax
}
