const { update, addToken } = require('../helpers')
const {
  TOKENIZER_CONTEXT_OPEN_TAG_END,
  TOKENIZER_CONTEXT_ATTRIBUTES,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_OPEN_TAG_START
} = require('../constants/token-types')

let syntaxHandlers = {
  closingCornerBraceOrSlash (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_OPEN_TAG_START,
      content: state.accumulatedContent
    })

    updatedState = update({
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_OPEN_TAG_END
    })

    return { updatedState, updatedTokens }
  },

  whitespace (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_OPEN_TAG_START,
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
  if (chars === '>' || chars === '/') {
    return syntaxHandlers.closingCornerBraceOrSlash
  }

  if (chars === ' ') {
    return syntaxHandlers.whitespace
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
