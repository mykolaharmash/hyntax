const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_COMMENT_START } = require('../constants/token-types')
const { COMMENT_CONTENT_CONTEXT } = require('../constants/tokenizer-contexts')

function commentStart (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: TOKEN_COMMENT_START,
    content: state.accumulatedContent + state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = COMMENT_CONTENT_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (chars === '<!--') {
    return commentStart(state, tokens)
  }
}

module.exports = {
  parseSyntax
}
