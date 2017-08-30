const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_QUOTE_START
} = require('../constants/token-types')


const syntaxHandlers = {
  quotationMark (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
      content: state.decisionBuffer
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE

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
