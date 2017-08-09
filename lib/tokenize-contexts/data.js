let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  openingCornerBrace (state) {
    return state
  },

  openingCornerBraceWithText (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'text',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'open-tag-start'

    return updatedState
  },

  openingCornerBraceWithSlash (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'text',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'close-tag'

    return updatedState
  }
}

function parseSyntax (chars) {
  if (chars === '<') {
    return syntaxHandlers.openingCornerBrace
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
