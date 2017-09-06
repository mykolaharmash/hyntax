let { update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_OPEN_TAG_END,
  TOKENIZER_CONTEXT_ATTRIBUTE_KEY,
  TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  closingCornerBraceOrSlash (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_OPEN_TAG_END
    })

    return { updatedState, updatedTokens: tokens }
  },

  letter (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_KEY
    })

    return { updatedState, updatedTokens: tokens }
  },

  equal (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT
    })

    return { updatedState, updatedTokens: tokens }
  }
}

function parseSyntax (chars) {
  if (chars === '>' || chars === '/') {
    return syntaxHandlers.closingCornerBraceOrSlash
  }

  if (chars === '=') {
    return syntaxHandlers.equal
  }

  const ATTRIBUTE_KEY_PATTERN = /^\S/

  if (ATTRIBUTE_KEY_PATTERN.test(chars)) {
    return syntaxHandlers.letter
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
