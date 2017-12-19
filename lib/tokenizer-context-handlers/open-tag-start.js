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

function handleTagEndAfterScriptOpenTagStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = OPEN_TAG_END_CONTEXT
  state.contextParams[OPEN_TAG_END_CONTEXT] = { tagName: 'script' }
}

function handleTagEndAfterStyleOpenTagStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = OPEN_TAG_END_CONTEXT
  state.contextParams[OPEN_TAG_END_CONTEXT] = { tagName: 'style' }
}

function handleTagEndAfterOpenTagStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = OPEN_TAG_END_CONTEXT
  state.contextParams[OPEN_TAG_END_CONTEXT] = { tagName: undefined }
}

function handleWhitespaceAfterScriptOpenTagStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
  state.contextParams[ATTRIBUTES_CONTEXT] = { tagName: 'script' }
}

function handleWhitespaceAfterStyleOpenTagStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
  state.contextParams[ATTRIBUTES_CONTEXT] = { tagName: 'style' }
}

function handleWhitespaceAfterOpenTagStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
  state.contextParams[ATTRIBUTES_CONTEXT] = { tagName: undefined }
}

const tagEndHandlersMap = {
  'script': handleTagEndAfterScriptOpenTagStart,
  'style': handleTagEndAfterStyleOpenTagStart,
  'default': handleTagEndAfterOpenTagStart
}

function tagEnd (state, tokens) {
  const tagName = parseOpenTagName(state.accumulatedContent)
  const handler = tagEndHandlersMap[tagName] || tagEndHandlersMap.default

  handler(state, tokens)
}

const whitespaceHandlersMap = {
  'script': handleWhitespaceAfterScriptOpenTagStart,
  'style': handleWhitespaceAfterStyleOpenTagStart,
  'default': handleWhitespaceAfterOpenTagStart
}

function whitespace (state, tokens) {
  const tagName = parseOpenTagName(state.accumulatedContent)
  const handler = whitespaceHandlersMap[tagName] || whitespaceHandlersMap.default

  handler(state, tokens)
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
}

module.exports = {
  parseSyntax
}
