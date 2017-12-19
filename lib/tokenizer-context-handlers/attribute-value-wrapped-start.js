const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT
} = require('../constants/tokenizer-contexts')

function wrapper (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_WRAPPED_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  const wrapperChar = state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT].wrapper

  if (chars === wrapperChar) {
    return wrapper(state, tokens)
  }
}

module.exports = {
  parseSyntax
}
