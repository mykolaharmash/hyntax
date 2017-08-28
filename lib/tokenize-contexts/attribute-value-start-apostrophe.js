let cloneState = require('../helpers').cloneDeep

let syntaxHandlers = {
  apostrophe (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-value-start-apostrophe',
      content: state.decisionBuffer
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value-apostrophe'

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
