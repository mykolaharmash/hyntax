let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  apostrophe (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-value-apostrophe',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value-end-apostrophe'

    return updatedState
  }
}

function parseSyntax (chars) {
  if (chars === '\'') {
    return syntaxHandlers.apostrophe
  }
}

module.exports = {
  parseSyntax
}
