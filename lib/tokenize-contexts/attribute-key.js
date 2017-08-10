let cloneState = require('../helpers').cloneState

let syntaxHandlers = {
  keyBreakChars (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'attribute-key',
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
  const KEY_BREAK_CHARS = [' ', '=', '/', '>']

  if (KEY_BREAK_CHARS.includes(chars)) {
    return syntaxHandlers.keyBreakChars
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
