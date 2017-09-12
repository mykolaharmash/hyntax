const { update, addToken } = require('../helpers')

const scriptTagContentContextFactory = require('./script-tag-content.factory')

const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT
} = require('../constants/token-types')

function getTokenType (tagName) {
  switch (tagName) {
    case 'script': {
      return TOKEN_OPEN_TAG_END_SCRIPT
    }

    default: {
      return TOKEN_OPEN_TAG_END
    }
  }
}

function getContentContext (tagName) {
  const dataContextFactory = require('./data.factory')

  switch (tagName) {
    case 'script': {
      return scriptTagContentContextFactory()
    }

    default: {
      return dataContextFactory()
    }
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, options) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: getTokenType(options.tagName),
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: getContentContext(options.tagName)
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, options) {
  if (chars === '>') {
    return (state, tokens) => {
      return syntaxHandlers.closingCornerBrace(state, tokens, options)
    }
  }
}

module.exports = function openTagEndContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
