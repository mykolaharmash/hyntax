const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_OPEN_TAG_END_STYLE
} = require('../constants/token-types')
const {
  OPEN_TAG_END_CONTEXT,
  DATA_CONTEXT,
  SCRIPT_CONTENT_CONTEXT,
  STYLE_CONTENT_CONTEXT
} = require('../constants/tokenizer-contexts')

function getTokenType (tagName) {
  switch (tagName) {
    case 'script': {
      return TOKEN_OPEN_TAG_END_SCRIPT
    }

    case 'style': {
      return TOKEN_OPEN_TAG_END_STYLE
    }

    default: {
      return TOKEN_OPEN_TAG_END
    }
  }
}

function getContentContext (tagName) {
  switch (tagName) {
    case 'script': {
      return SCRIPT_CONTENT_CONTEXT
    }

    case 'style': {
      return STYLE_CONTENT_CONTEXT
    }

    default: {
      return DATA_CONTEXT
    }
  }
}

function closingCornerBrace (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })
  const tagName = state.contextParams[OPEN_TAG_END_CONTEXT].tagName

  tokens.push({
    type: getTokenType(tagName),
    content: state.accumulatedContent + state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = getContentContext(tagName)

  delete state.contextParams[OPEN_TAG_END_CONTEXT]
}

function parseSyntax (chars, state, tokens) {
  if (chars === '>') {
    return closingCornerBrace(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
}

module.exports = {
  parseSyntax
}
