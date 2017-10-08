const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT
} = require('../constants/token-types')
const {
  OPEN_TAG_END_FACTORY,
  DATA_FACTORY,
  SCRIPT_CONTENT_FACTORY
} = require('../constants/tokenizer-context-factories')

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

function getContentContext (tagName, contextFactories, options) {
  const scriptContentContext = contextFactories[SCRIPT_CONTENT_FACTORY](
    contextFactories,
    options
  )
  const dataContext = contextFactories[DATA_FACTORY](
    contextFactories,
    options
  )

  switch (tagName) {
    case 'script': {
      return scriptContentContext
    }

    default: {
      return dataContext
    }
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: getTokenType(options.tagName),
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: getContentContext(
        options.tagName,
        contextFactories,
        options
      )
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function openTagEndContextFactory (contextFactories, options) {
  return {
    factoryName: OPEN_TAG_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
