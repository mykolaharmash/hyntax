const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_OPEN_TAG_END,
  TOKENIZER_CONTEXT_ATTRIBUTE_KEY,
  TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  closingCornerBraceOrSlash (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_OPEN_TAG_END

    return updatedState
  },

  letter (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_KEY

    return updatedState
  },

  equal (state) {
    const updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT

    return updatedState
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
