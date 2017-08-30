const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_APOSTROPHE_START
} = require('../constants/token-types')


const syntaxHandlers = {
  apostrophe (state) {
    const updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_ATTRIBUTE_VALUE_APOSTROPHE_START,
      content: state.decisionBuffer
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE

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
