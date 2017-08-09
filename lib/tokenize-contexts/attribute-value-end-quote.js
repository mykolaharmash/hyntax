let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  quotationMark (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-value-end-quote',
      content: state.decisionBuffer
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attributes'

    return updatedState
  }
}

function parseSyntax (chars) {
  if (chars === '"') {
    return syntaxHandlers.quotationMark
  }
}

module.exports = {
  parseSyntax
}
