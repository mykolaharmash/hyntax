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

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories, options) {
    const tokenType = getCloseTokenType(options.withinContent)
    const dataContext = contextFactories[DATA_CONTEXT](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    tokens.push({
      type: tokenType,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.decisionBuffer = ''
    state.currentContext = dataContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => {
      return syntaxHandlers.closingCornerBrace(
        state,
        tokens,
        contextFactories,
        options
      )
    }
  }
}

module.exports = function closeTagContextFactory (contextFactories, options) {
  return {
    factoryName: CLOSE_TAG_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
