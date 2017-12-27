const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_DOCTYPE_END } = require('../constants/token-types')
const { DATA_CONTEXT } = require('../constants/tokenizer-contexts')

function closingCornerBrace (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: TOKEN_DOCTYPE_END,
    content: state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DATA_CONTEXT
  state.caretPosition++
}

function parseSyntax (chars, state, tokens) {
  return closingCornerBrace(state, tokens)
}

module.exports = {
  parseSyntax
}
