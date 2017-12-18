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

function getContentContext (tagName, contextFactories, options) {
  switch (tagName) {
    case 'script': {
      return contextFactories[SCRIPT_CONTENT_CONTEXT](
        contextFactories,
        options
      )
    }

    case 'style': {
      return contextFactories[STYLE_CONTENT_CONTEXT](
        contextFactories,
        options
      )
    }

    default: {
      return contextFactories[DATA_CONTEXT](
        contextFactories,
        options
      )
    }
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories, options) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    tokens.push({
      type: getTokenType(options.tagName),
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.decisionBuffer = ''
    state.currentContext = getContentContext(
      options.tagName,
      contextFactories,
      options
    )
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
    factoryName: OPEN_TAG_END_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
