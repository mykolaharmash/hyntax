let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  closingCornerBraceOrSlash (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'open-tag-end'

    return updatedState
  },

  letter (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-key'

    return updatedState
  },

  equal (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-assignment'

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

  const ATTRIBUTE_KEY_PATTERN = /^\w/

  if (ATTRIBUTE_KEY_PATTERN.test(chars)) {
    return syntaxHandlers.letter
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
