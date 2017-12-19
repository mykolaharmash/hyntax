const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_END_CONTEXT
} = require('../constants/tokenizer-contexts')

function wrapper (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_ATTRIBUTE_VALUE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_WRAPPED_END_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  const wrapperChar = state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT].wrapper

  if (chars === wrapperChar) {
    return wrapper(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
