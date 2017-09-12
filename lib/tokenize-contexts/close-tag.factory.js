const { addToken, update } = require('../helpers')

const {
  TOKEN_CLOSE_TAG,
  TOKEN_CLOSE_TAG_SCRIPT
} = require('../constants/token-types')

/**
 * @param withinContent — type of content withing
 * which the close tag was found
 */
function getCloseTokenType (withinContent) {
  switch (withinContent) {
    case 'script': {
      return TOKEN_CLOSE_TAG_SCRIPT
    }
    case 'data': {
      return TOKEN_CLOSE_TAG
    }
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, options) {
    const dataContextFactory = require('./data.factory')

    let updatedState = state
    let updatedTokens = tokens
    const tokenType = getCloseTokenType(options.withinContent)

    updatedTokens = addToken(tokens, {
      type: tokenType,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: dataContextFactory()
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, options) {
  if (chars === '>') {
    return (state, tokens) => {
      return syntaxHandlers.closingCornerBrace(
        state,
        tokens,
        options
      )
    }
  }
}

module.exports = function closeTagContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
