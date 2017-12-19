const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_ATTRIBUTE_ASSIGNMENT } = require('../constants/token-types')
const { ATTRIBUTE_VALUE_CONTEXT } = require('../constants/tokenizer-contexts')

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
}

function parseSyntax (chars, state, tokens) {
  if (chars === '=') {
    return equal(state, tokens)
  }
}

module.exports = {
  parseSyntax
}
