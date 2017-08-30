const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_OPEN_TAG_END,
  TOKENIZER_CONTEXT_ATTRIBUTES,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_OPEN_TAG_START
} = require('../constants/token-types')

let syntaxHandlers = {
  closingCornerBraceOrSlash (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_OPEN_TAG_START,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_OPEN_TAG_END

    return updatedState
  },

  whitespace (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_OPEN_TAG_START,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTES

    return updatedState
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
