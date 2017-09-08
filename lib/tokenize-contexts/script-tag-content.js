const { update, addToken } = require('../helpers')
const {
  TOKENIZER_CONTEXT_CLOSE_TAG_SCRIPT
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_SCRIPT_TAG_CONTENT
} = require('../constants/token-types')

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
      currentContextType: TOKENIZER_CONTEXT_CLOSE_TAG_SCRIPT
    })

    return { updatedState, updatedTokens }
  }
}

function parseScriptTagContentSyntax (chars) {
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

module.exports = {
  parseSyntax: parseScriptTagContentSyntax
}
