const { isWhitespace } = require('../helpers')

const {
  DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT,
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  DOCTYPE_END_CONTEXT
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START
} = require('../constants/token-types')

function wrapper (state, tokens) {
  const wrapper = state.decisionBuffer

  tokens.push({
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    content: wrapper,
    startPosition: state.caretPosition,
    endPosition: state.caretPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT
  state.contextParams[DOCTYPE_ATTRIBUTE_WRAPPED_CONTEXT] = { wrapper }
  state.caretPosition++
}

function bare (state) {
  state.accumulatedContent = state.decisionBuffer
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_ATTRIBUTE_BARE_CONTEXT
  state.caretPosition++
}

function closingCornerBrace (state) {
  state.accumulatedContent = ''
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
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
