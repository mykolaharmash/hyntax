let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTES,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_KEY
} = require('../constants/token-types')

const syntaxHandlers = {
  keyBreakChars (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_KEY,
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
  const KEY_BREAK_CHARS = [' ', '=', '/', '>']

  if (KEY_BREAK_CHARS.includes(chars)) {
    return syntaxHandlers.keyBreakChars
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
