const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_SCRIPT_TAG_CONTENT,
} = require('../constants/token-types')
const {
  SCRIPT_CONTENT_CONTEXT,
  CLOSE_TAG_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  closingScriptTag (state, tokens, contextFactories) {
    const closeTagContext = contextFactories[CLOSE_TAG_CONTEXT](
      contextFactories,
      { withinContent: 'script' }
    )

    if (state.accumulatedContent !== '') {
      const range = calculateTokenCharactersRange(state, { keepBuffer: false })

      tokens.push({
        type: TOKEN_SCRIPT_TAG_CONTENT,
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
const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/i

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

  if (CLOSING_SCRIPT_TAG_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.closingScriptTag(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function scriptTagContentContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: SCRIPT_CONTENT_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
