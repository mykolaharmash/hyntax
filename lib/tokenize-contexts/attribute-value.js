let { update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE,
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  quotationMark (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START
    })

    return { updatedState, updatedTokens: tokens }
  },

  apostrophe (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START
    })

    return { updatedState, updatedTokens: tokens }
  },

  bare (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE
    })

    return { updatedState, updatedTokens: tokens }
  },

  closingCornerBraceOrSlash (state, tokens) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_ATTRIBUTES
    })

    return { updatedState, updatedTokens: tokens }
  }
}

function parseSyntax (chars) {
  if (chars === '"') {
    return syntaxHandlers.quotationMark
  }

  if (chars === '\'') {
    return syntaxHandlers.apostrophe
  }

  if (chars === '>' || chars === '/') {
    return syntaxHandlers.closingCornerBraceOrSlash
  }

  const BARE_VALUE_PATTERN = /\S/

  if (BARE_VALUE_PATTERN.test(chars)) {
    return syntaxHandlers.bare
  }
}

module.exports = {
  parseSyntax
}
