let cloneState = require('../helpers').cloneDeep

let syntaxHandlers = {
  valueEnd (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-value-bare',
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
  const BARE_VALUE_END_PATTERN = /\s/

  if (
    BARE_VALUE_END_PATTERN.test(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return syntaxHandlers.valueEnd
  }
}

module.exports = {
  parseSyntax
}
