const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_TEXT
} = require('../constants/token-types')
const {
  OPEN_TAG_START_CONTEXT,
  CLOSE_TAG_CONTEXT,
  DOCTYPE_START_CONTEXT,
  COMMENT_START_CONTEXT
} = require('../constants/tokenizer-contexts')

function generateTextToken (state) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  return {
    type: TOKEN_TEXT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  }
}

function openingCornerBraceWithText (state, tokens) {
  if (state.accumulatedContent.length !== 0) {
    tokens.push(generateTextToken(state))
  }

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = OPEN_TAG_START_CONTEXT
}

function openingCornerBraceWithSlash (state, tokens) {
  if (state.accumulatedContent.length !== 0) {
    tokens.push(generateTextToken(state))
  }

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = CLOSE_TAG_CONTEXT
  state.contextParams[CLOSE_TAG_CONTEXT] = { withinContent: 'data' }
}

function doctypeStart (state, tokens) {
  if (state.accumulatedContent.length !== 0) {
    tokens.push(generateTextToken(state))
  }

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = DOCTYPE_START_CONTEXT
}

function commentStart (state, tokens) {
  if (state.accumulatedContent.length !== 0) {
    tokens.push(generateTextToken(state))
  }

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = COMMENT_START_CONTEXT
}

function handleContentEnd (state, tokens) {
  const textContent = state.accumulatedContent + state.decisionBuffer

  if (textContent.length !== 0) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    tokens.push({
      type: TOKEN_TEXT,
      content: textContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }
}

const INCOMPLETE_DOCTYPE_START = /<!\w*$/
const COMPLETE_DOCTYPE_START = /<!DOCTYPE/i
const OPEN_TAG_START_PATTERN = /^<\w/

function parseSyntax (chars, state, tokens) {
  if (OPEN_TAG_START_PATTERN.test(chars)) {
    return openingCornerBraceWithText(state, tokens)
  }

  if (chars === '</') {
    return openingCornerBraceWithSlash(state, tokens)
  }

  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
    || INCOMPLETE_DOCTYPE_START.test(chars)
  ) {
    return
  }

  if (chars === '<!--') {
    return commentStart(state, tokens)
  }

  if (COMPLETE_DOCTYPE_START.test(chars)) {
    return doctypeStart(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax,
  handleContentEnd
}
