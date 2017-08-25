let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  quotationMark (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value-start-quote'

    return updatedState
  },

  apostrophe (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value-start-apostrophe'

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
}

module.exports = {
  parseSyntax
}
