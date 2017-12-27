const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_OPEN_TAG_END_STYLE
} = require('../constants/token-types')
const {
  OPEN_TAG_END_CONTEXT,
  DATA_CONTEXT,
  SCRIPT_CONTENT_CONTEXT,
  STYLE_CONTENT_CONTEXT
} = require('../constants/tokenizer-contexts')

const tokensMap = {
  'script': TOKEN_OPEN_TAG_END_SCRIPT,
  'style': TOKEN_OPEN_TAG_END_STYLE,
  'default': TOKEN_OPEN_TAG_END
}

const contextsMap = {
  'script': SCRIPT_CONTENT_CONTEXT,
  'style': STYLE_CONTENT_CONTEXT,
  'default': DATA_CONTEXT
}

function closingCornerBrace (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })
  const tagName = state.contextParams[OPEN_TAG_END_CONTEXT].tagName

  tokens.push({
    type: tokensMap[tagName] || tokensMap.default,
    content: state.accumulatedContent + state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = contextsMap[tagName] || contextsMap.default
  state.caretPosition++

  state.contextParams[OPEN_TAG_END_CONTEXT] = undefined
}

function parseSyntax (chars, state, tokens) {
  if (chars === '>') {
    return closingCornerBrace(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
