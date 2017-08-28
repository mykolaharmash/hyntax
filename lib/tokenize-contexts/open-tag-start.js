let cloneState = require('../helpers').cloneDeep

let syntaxHandlers = {
  closingCornerBraceOrSlash (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'open-tag-start',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'open-tag-end'

    return updatedState
  },

  whitespace (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'open-tag-start',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attributes'

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
