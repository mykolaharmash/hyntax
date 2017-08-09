let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  quotationMark (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-value-start-quote',
      content: state.decisionBuffer
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value-quoted'

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
