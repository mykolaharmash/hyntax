const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_COMMENT_CONTENT } = require('../constants/token-types')
const { COMMENT_END_CONTEXT } = require('../constants/tokenizer-contexts')

function commentEnd (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_COMMENT_CONTENT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = COMMENT_END_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (chars === '-' || chars === '--') {
    return
  }

  if (chars === '-->') {
    return commentEnd(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
