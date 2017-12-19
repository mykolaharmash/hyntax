const { isWhitespace } = require('../helpers')
const {
  ATTRIBUTES_CONTEXT,
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTE_ASSIGNMENT_CONTEXT,
  ATTRIBUTE_KEY_CONTEXT
} = require('../constants/tokenizer-contexts')

function tagEnd (state) {
  const tagName = state.contextParams[ATTRIBUTES_CONTEXT].tagName

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = OPEN_TAG_END_CONTEXT
  state.contextParams[OPEN_TAG_END_CONTEXT] = { tagName }

  delete state.contextParams[ATTRIBUTES_CONTEXT]
}

function noneWhitespace (state) {
  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_KEY_CONTEXT
}

function equal (state) {
  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_ASSIGNMENT_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (chars === '>' || chars === '/') {
    return tagEnd(state, tokens)
  }

  if (chars === '=') {
    return equal(state, tokens)
  }

  if (!isWhitespace(chars)) {
    return noneWhitespace(state, tokens)
  }

  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
