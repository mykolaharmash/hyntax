const {
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')
const {
  ATTRIBUTES_CONTEXT,
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT,
  ATTRIBUTE_KEY_CONTEXT
} = require('../constants/tokenizer-contexts')
const { TOKEN_ATTRIBUTE_ASSIGNMENT } = require('../constants/token-types')

function tagEnd (state) {
  const tagName = state.contextParams[ATTRIBUTES_CONTEXT].tagName

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = OPEN_TAG_END_CONTEXT
  state.contextParams[OPEN_TAG_END_CONTEXT] = { tagName }

  state.contextParams[ATTRIBUTES_CONTEXT] = undefined
}

function noneWhitespace (state) {
  state.accumulatedContent = state.decisionBuffer
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_KEY_CONTEXT
  state.caretPosition++
}

function equal (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTE_VALUE_CONTEXT
  state.caretPosition++
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
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
