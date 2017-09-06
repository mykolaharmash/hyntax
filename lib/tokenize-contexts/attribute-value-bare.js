let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_BARE
} = require('../constants/token-types')

const syntaxHandlers = {
  valueEnd (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_BARE,
      content: state.accumulatedContent
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTES
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars) {
  const BARE_VALUE_END_PATTERN = /\s/

  if (
    BARE_VALUE_END_PATTERN.test(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return syntaxHandlers.valueEnd
  }
}

module.exports = {
  parseSyntax
}
