const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../constants/token-types')
const {
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT
} = require('../constants/tokenizer-contexts')

function wrapper (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })
  const endWrapperPosition = range.endPosition + 1

  tokens.push(
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: state.decisionBuffer,
      startPosition: endWrapperPosition,
      endPosition: endWrapperPosition
    }
  )

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
  state.caretPosition++

  state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT] = undefined
}

function parseSyntax (chars, state, tokens) {
  const wrapperChar = state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT].wrapper

  if (chars === wrapperChar) {
    return wrapper(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
