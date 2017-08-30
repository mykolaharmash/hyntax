const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_OPEN_TAG_START,
  TOKENIZER_CONTEXT_CLOSE_TAG,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_TEXT
} = require('../constants/token-types')

const syntaxHandlers = {
  openingCornerBrace (state) {
    return state
  },

  openingCornerBraceWithText (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_TEXT,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_OPEN_TAG_START

    return updatedState
  },

  openingCornerBraceWithSlash (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_TEXT,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_CLOSE_TAG

    return updatedState
  },

  endOfText (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_TEXT,
      content: state.accumulatedContent
    })

    return updatedState
  }
}

function parseSyntax (chars) {
  if (chars === '<') {
    return syntaxHandlers.openingCornerBrace
  }

  if (chars === "\u0003") {
    return syntaxHandlers.endOfText
  }

  const OPEN_TAG_START_PATTERN = /^<\w/

  if (OPEN_TAG_START_PATTERN.test(chars)) {
    return syntaxHandlers.openingCornerBraceWithText
  }

  if (chars === '</') {
    return syntaxHandlers.openingCornerBraceWithSlash
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
