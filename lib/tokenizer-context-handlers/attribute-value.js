const { isWhitespace } = require('../helpers')
const {
  ATTRIBUTE_VALUE_WRAPPED_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_START_CONTEXT,
  ATTRIBUTE_VALUE_BARE_CONTEXT
} = require('../constants/tokenizer-contexts')

function wrapper (state) {
  const wrapper = state.decisionBuffer

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_WRAPPED_START_CONTEXT
  state.contextParams[ATTRIBUTE_VALUE_WRAPPED_CONTEXT] = { wrapper }
}

function bare (state) {
  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_BARE_CONTEXT
}

function tagEnd (state) {
  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
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
}

module.exports = {
  parseSyntax
}
