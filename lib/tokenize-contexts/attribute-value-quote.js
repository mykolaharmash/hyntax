const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_QUOTE
} = require('../constants/token-types')

const syntaxHandlers = {
  quotationMark (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END

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
