const { isWhitespace } = require('../helpers')
const {
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_VALUE_BARE_CONTEXT
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START
} = require('../constants/token-types')

function wrapper (state, tokens) {
  const wrapper = state.decisionBuffer

  tokens.push({
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: wrapper,
    startPosition: state.caretPosition,
    endPosition: state.caretPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_WRAPPED_CONTEXT
  state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT] = { wrapper }
  state.caretPosition++
}

function bare (state) {
  state.accumulatedContent = state.decisionBuffer
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_BARE_CONTEXT
  state.caretPosition++
}

function tagEnd (state) {
  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (chars === '"' || chars === '\'') {
    return wrapper(state, tokens)
  }

  if (chars === '>' || chars === '/') {
    return tagEnd(state, tokens)
  }

  if (!isWhitespace(chars)) {
    return bare(state, tokens)
  }

  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
