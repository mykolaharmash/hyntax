const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_CLOSE_TAG,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_CLOSE_TAG_STYLE
} = require('../constants/token-types')
const {
  CLOSE_TAG_CONTEXT,
  DATA_CONTEXT
} = require('../constants/tokenizer-contexts')

/**
 * @param withinContent — type of content withing
 * which the close tag was found
 */
function getCloseTokenType (withinContent) {
  switch (withinContent) {
    case 'script': {
      return TOKEN_CLOSE_TAG_SCRIPT
    }

    case 'style': {
      return TOKEN_CLOSE_TAG_STYLE
    }

    case 'data': {
      return TOKEN_CLOSE_TAG
    }
  }
}

function closingCornerBrace (state, tokens) {
  const tokenType = getCloseTokenType(
    state.contextParams[CLOSE_TAG_CONTEXT].withinContent
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: true })

  tokens.push({
    type: tokenType,
    content: state.accumulatedContent + state.decisionBuffer,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = DATA_CONTEXT

  delete state.contextParams[CLOSE_TAG_CONTEXT]
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
