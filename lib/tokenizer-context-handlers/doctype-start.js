const { isWhitespace, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_START
} = require('../constants/token-types')

const {
  DOCTYPE_END_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

function generateDoctypeStartToken (state) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  return {
    type: TOKEN_DOCTYPE_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  }
}

function closingCornerBrace (state, tokens) {
  tokens.push(generateDoctypeStartToken(state))

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_END_CONTEXT
}

function whitespace (state, tokens) {
  tokens.push(generateDoctypeStartToken(state))

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_ATTRIBUTES_CONTEXT
}

function parseSyntax (chars, state, tokens) {
  if (isWhitespace(chars)) {
    return whitespace(state, tokens)
  }

  if (chars === '>') {
    return closingCornerBrace(state, tokens)
  }

  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
