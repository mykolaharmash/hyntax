let cloneState = require('../helpers').cloneDeep

let syntaxHandlers = {
  equal (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-assignment',
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'attribute-value'

    return updatedState
  },
}

function parseSyntax (chars) {
  if (chars === '=') {
    return syntaxHandlers.equal
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
