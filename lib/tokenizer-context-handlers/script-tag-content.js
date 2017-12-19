const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_SCRIPT_TAG_CONTENT, } = require('../constants/token-types')
const { CLOSE_TAG_CONTEXT } = require('../constants/tokenizer-contexts')

function closingScriptTag (state, tokens) {
  if (state.accumulatedContent !== '') {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    tokens.push({
      type: TOKEN_SCRIPT_TAG_CONTENT,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = CLOSE_TAG_CONTEXT
  state.contextParams[CLOSE_TAG_CONTEXT] = { withinContent: 'script' }
}

const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/
const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/i

function parseSyntax (chars, state, tokens) {
  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    return
  }

  if (CLOSING_SCRIPT_TAG_PATTERN.test(chars)) {
    return closingScriptTag(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
