const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_OPEN_TAG_START,
  TOKENIZER_CONTEXT_CLOSE_TAG,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_TEXT
} = require('../constants/token-types')

function calculateCharactersRange (state) {
  const startPosition = (
    state.caretPosition -
    (state.accumulatedContent.length - 1) -
    state.decisionBuffer.length
  )
  const endPosition = (
    state.caretPosition -
    state.decisionBuffer.length
  )

  return { startPosition, endPosition }
}

const syntaxHandlers = {
  openingCornerBrace (state) {
    return state
  },

  openingCornerBraceWithText (state) {
    const updatedState = cloneState(state)

    if (state.accumulatedContent.length !== 0) {
      const range = calculateCharactersRange(state)

      updatedState.tokens.push({
        type: TOKEN_TEXT,
        content: state.accumulatedContent,
        startPosition: range.startPosition,
        endPosition: range.endPosition
      })
    }

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_OPEN_TAG_START

    return updatedState
  },

  openingCornerBraceWithSlash (state) {
    const updatedState = cloneState(state)

    if (state.accumulatedContent.length !== 0) {
      const range = calculateCharactersRange(state)

      updatedState.tokens.push({
        type: TOKEN_TEXT,
        content: state.accumulatedContent,
        startPosition: range.startPosition,
        endPosition: range.endPosition
      })
    }

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_CLOSE_TAG

    return updatedState
  },

  endOfText (state) {
    const updatedState = cloneState(state)

    if (state.accumulatedContent.length !== 0) {
      const range = calculateCharactersRange(state)

      updatedState.tokens.push({
        type: TOKEN_TEXT,
        content: state.accumulatedContent,
        startPosition: range.startPosition,
        endPosition: range.endPosition
      })
    }

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
