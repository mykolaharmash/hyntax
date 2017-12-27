const {
  parseOpenTagName,
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_START_STYLE
} = require('../constants/token-types')
const {
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

const tokensMap = {
  'script': TOKEN_OPEN_TAG_START_SCRIPT,
  'style': TOKEN_OPEN_TAG_START_STYLE,
  'default': TOKEN_OPEN_TAG_START
}

function tagEnd (state, tokens) {
  const tagName = parseOpenTagName(state.accumulatedContent)
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: tokensMap[tagName] || tokensMap.default,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.decisionBuffer = ''
  state.accumulatedContent = ''
  state.currentContext = OPEN_TAG_END_CONTEXT
  state.contextParams[OPEN_TAG_END_CONTEXT] = { tagName }
}

function whitespace (state, tokens) {
  const tagName = parseOpenTagName(state.accumulatedContent)
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: tokensMap[tagName] || tokensMap.default,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
  state.contextParams[ATTRIBUTES_CONTEXT] = { tagName }
  state.caretPosition++
}

function parseSyntax (chars, state, tokens) {
  if (chars === '>' || chars === '/') {
    return tagEnd(state, tokens)
  }

  if (isWhitespace(chars)) {
    return whitespace(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
