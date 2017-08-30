const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTES,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_KEY
} = require('../constants/token-types')

const syntaxHandlers = {
  keyBreakChars (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_ATTRIBUTE_KEY,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTES

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
