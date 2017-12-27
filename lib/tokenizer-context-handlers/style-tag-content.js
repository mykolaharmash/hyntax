const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_STYLE_TAG_CONTENT,
  TOKEN_CLOSE_TAG_STYLE
} = require('../constants/token-types')
const { DATA_CONTEXT } = require('../constants/tokenizer-contexts')

function closingStyleTag (state, tokens) {
  if (state.accumulatedContent !== '') {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    tokens.push({
      type: TOKEN_STYLE_TAG_CONTENT,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }

  tokens.push({
    type: TOKEN_CLOSE_TAG_STYLE,
    content: state.decisionBuffer,
    startPosition: state.caretPosition - (state.decisionBuffer.length - 1),
    endPosition: state.caretPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DATA_CONTEXT
  state.caretPosition++
}

const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/
const CLOSING_STYLE_TAG_PATTERN = /<\/style\s*>/i

function parseSyntax (chars, state, tokens) {
  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    state.caretPosition++

    return
  }

  if (CLOSING_STYLE_TAG_PATTERN.test(chars)) {
    return closingStyleTag(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
