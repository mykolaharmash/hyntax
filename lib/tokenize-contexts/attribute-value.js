let cloneState = require('../helpers').cloneDeep

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
  },

  closingCornerBraceOrSlash (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attributes'

    return updatedState
  },

  bare (state) {
    let updatedState = cloneState(state)

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value-bare'

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
