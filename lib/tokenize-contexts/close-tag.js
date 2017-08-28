let cloneState = require('../helpers').cloneDeep

let syntaxHandlers = {
  closingCornerBrace (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'close-tag',
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'data'

    return updatedState
  }
}

function parseSyntax (chars) {
  if (chars === '>') {
    return syntaxHandlers.closingCornerBrace
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
