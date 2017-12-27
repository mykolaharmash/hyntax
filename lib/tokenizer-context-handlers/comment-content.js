const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_COMMENT_END,
  TOKEN_COMMENT_CONTENT
} = require('../constants/token-types')
const {
  DATA_CONTEXT
} = require('../constants/tokenizer-contexts')

const COMMENT_END = '-->'

function commentEnd (state, tokens) {
  const contentRange = calculateTokenCharactersRange(state, { keepBuffer: false })
  const commentEndRange = {
    startPosition: contentRange.endPosition + 1,
    endPosition: contentRange.endPosition + COMMENT_END.length,
  }

  tokens.push({
    type: TOKEN_COMMENT_CONTENT,
    content: state.accumulatedContent,
    startPosition: contentRange.startPosition,
    endPosition: contentRange.endPosition
  })

  tokens.push({
    type: TOKEN_COMMENT_END,
    content: state.decisionBuffer,
    startPosition: commentEndRange.startPosition,
    endPosition: commentEndRange.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DATA_CONTEXT
  state.caretPosition++
}

function parseSyntax (chars, state, tokens) {
  if (chars === '-' || chars === '--') {
    state.caretPosition++

    return
  }

  if (chars === COMMENT_END) {
    return commentEnd(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
