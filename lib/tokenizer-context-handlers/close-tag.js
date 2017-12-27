const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_CLOSE_TAG } = require('../constants/token-types')
const { DATA_CONTEXT } = require('../constants/tokenizer-contexts')

function closingCornerBrace (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: TOKEN_CLOSE_TAG,
    content: state.accumulatedContent + state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DATA_CONTEXT
  state.caretPosition++
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
