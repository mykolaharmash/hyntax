const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_STYLE_TAG_CONTENT,
} = require('../constants/token-types')
const {
  STYLE_CONTENT_CONTEXT,
  CLOSE_TAG_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  closingStyleTag (state, tokens, contextFactories) {
    const closeTagContext = contextFactories[CLOSE_TAG_CONTEXT](
      contextFactories,
      { withinContent: 'style' }
    )

    if (state.accumulatedContent !== '') {
      const range = calculateTokenCharactersRange(state, { keepBuffer: false })

      tokens.push({
        type: TOKEN_STYLE_TAG_CONTENT,
        content: state.accumulatedContent,
        startPosition: range.startPosition,
        endPosition: range.endPosition
      })
    }

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = closeTagContext
  }
}

const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/
const CLOSING_STYLE_TAG_PATTERN = /<\/style\s*>/i

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    /**
     * Signals to wait for more characters in
     * the decision buffer to decide about syntax
     */
    return () => {}
  }

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
    factoryName: STYLE_CONTENT_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
