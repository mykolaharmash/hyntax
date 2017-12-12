const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_SCRIPT_TAG_CONTENT,
} = require('../constants/token-types')
const {
  SCRIPT_CONTENT_CONTEXT,
  CLOSE_TAG_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  incompleteClosingTag (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  closingScriptTag (state, tokens, contextFactories) {
    const closeTagContext = contextFactories[CLOSE_TAG_CONTEXT](
      contextFactories,
      { withinContent: 'script' }
    )

    let updatedTokens = tokens

    if (state.accumulatedContent !== '') {
      const range = calculateTokenCharactersRange(state, { keepBuffer: false })

      updatedTokens = addToken(tokens, {
        type: TOKEN_SCRIPT_TAG_CONTENT,
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

  const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/i

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
