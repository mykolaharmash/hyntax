const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE,
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')

let syntaxHandlers = {
  equal (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTE_VALUE

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
