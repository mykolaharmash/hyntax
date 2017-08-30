const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE,
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  quotationMark (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START

    return updatedState
  },

  apostrophe (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START

    return updatedState
  },

  bare (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE

    return updatedState
  },

  closingCornerBraceOrSlash (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTES

    return updatedState
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
