let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  apostrophe (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-value-end-apostrophe',
      content: state.decisionBuffer
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attributes'

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
