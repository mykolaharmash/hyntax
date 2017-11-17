const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_STYLE_TAG_CONTENT,
} = require('../constants/token-types')
const {
  STYLE_CONTENT_FACTORY,
  CLOSE_TAG_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  incompleteClosingTag (state, tokens, contextFactories, options) {
    return { updatedState: state, updatedTokens: tokens }
  },

  closingStyleTag (state, tokens, contextFactories, options) {
    const closeTagContext = contextFactories[CLOSE_TAG_FACTORY](
      contextFactories,
      { withinContent: 'style' }
    )

    let updatedTokens = tokens

    if (state.accumulatedContent !== '') {
      const range = calculateTokenCharactersRange(state, { keepBuffer: false })

      updatedTokens = addToken(tokens, {
        type: TOKEN_STYLE_TAG_CONTENT,
        content: state.accumulatedContent,
        startPosition: range.startPosition,
        endPosition: range.endPosition
      })
    }

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: closeTagContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/

  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    return (state, tokens) => syntaxHandlers.incompleteClosingTag(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const CLOSING_STYLE_TAG_PATTERN = /<\/style\s*>/i

  if (CLOSING_STYLE_TAG_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.closingStyleTag(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function styleTagContentContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: STYLE_CONTENT_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
