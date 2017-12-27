const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_CLOSE_TAG_SCRIPT
} = require('../constants/token-types')
const { DATA_CONTEXT } = require('../constants/tokenizer-contexts')

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

  tokens.push({
    type: TOKEN_CLOSE_TAG_SCRIPT,
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
const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/i

function parseSyntax (chars, state, tokens) {
  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    state.caretPosition++

    return
  }

  if (CLOSING_SCRIPT_TAG_PATTERN.test(chars)) {
    return closingScriptTag(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
