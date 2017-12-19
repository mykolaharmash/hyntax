const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_DOCTYPE_END } = require('../constants/token-types')
const { DATA_CONTEXT } = require('../constants/tokenizer-contexts')

function closingCornerBrace (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: TOKEN_DOCTYPE_END,
    content: state.accumulatedContent + state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DATA_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (chars === '>') {
    return closingCornerBrace(state, tokens)
  }
}

module.exports = {
  parseSyntax
}
