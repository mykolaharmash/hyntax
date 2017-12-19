const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_STYLE_TAG_CONTENT, } = require('../constants/token-types')
const { CLOSE_TAG_CONTEXT } = require('../constants/tokenizer-contexts')

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

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = CLOSE_TAG_CONTEXT
  state.contextParams[CLOSE_TAG_CONTEXT] = { withinContent: 'style' }
}

const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/
const CLOSING_STYLE_TAG_PATTERN = /<\/style\s*>/i

function parseSyntax (chars, state, tokens) {
  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    return
  }

  if (CLOSING_STYLE_TAG_PATTERN.test(chars)) {
    return closingStyleTag(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
