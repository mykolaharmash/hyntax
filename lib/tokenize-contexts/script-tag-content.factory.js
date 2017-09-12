const { update, addToken } = require('../helpers')
const closeTagContextFactory = require('./close-tag.factory')
const {
  TOKEN_SCRIPT_TAG_CONTENT,
} = require('../constants/token-types')

const scriptCloseTagContext = closeTagContextFactory({
  withinContent: 'script'
})

const syntaxHandlers = {
  incompleteClosingTag (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  closingScriptTag (state, tokens) {
    const updatedTokens = addToken(tokens, {
      type: TOKEN_SCRIPT_TAG_CONTENT,
      content: state.accumulatedContent
    })

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: scriptCloseTagContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars) {
  const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/

  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    return syntaxHandlers.incompleteClosingTag
  }

  const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/

  if (CLOSING_SCRIPT_TAG_PATTERN.test(chars)) {
    return syntaxHandlers.closingScriptTag
  }
}

module.exports = function scriptTagContentContextFactory () {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
