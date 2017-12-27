const {
  calculateTokenCharactersRange,
  isWhitespace
} = require('../helpers')

const { TOKEN_ATTRIBUTE_VALUE } = require('../constants/token-types')
const { ATTRIBUTES_CONTEXT } = require('../constants/tokenizer-contexts')

function valueEnd (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_ATTRIBUTE_VALUE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (
    isWhitespace(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return valueEnd(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
