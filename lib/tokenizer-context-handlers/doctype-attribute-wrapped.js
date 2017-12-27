const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
  TOKEN_DOCTYPE_ATTRIBUTE
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

function wrapper (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })
  const endWrapperPosition = range.endPosition + 1

  tokens.push({
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  tokens.push({
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
    content: state.decisionBuffer,
    startPosition: endWrapperPosition,
    endPosition: endWrapperPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_ATTRIBUTES_CONTEXT
  state.caretPosition++

  state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT] = undefined
}

function parseSyntax (chars, state, tokens) {
  const wrapperChar = state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT].wrapper

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
