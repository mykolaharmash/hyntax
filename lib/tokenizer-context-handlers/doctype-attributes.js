const { isWhitespace } = require('../helpers')

const {
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  DOCTYPE_END_CONTEXT
} = require('../constants/tokenizer-contexts')

function wrapper (state) {
  const wrapper = state.decisionBuffer

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT
  state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT] = { wrapper }
}

function bare (state) {
  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_ATTRIBUTE_BARE_CONTEXT
}

function closingCornerBrace (state) {
  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_END_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (chars === '"' || chars === '\'') {
    return wrapper(state, tokens)
  }

  if (chars === '>') {
    return closingCornerBrace(state, tokens)
  }

  if (!isWhitespace(chars)) {
    return bare(state, tokens)
  }

  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
