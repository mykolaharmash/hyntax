const { isWhitespace, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_START
} = require('../constants/token-types')

const {
  DOCTYPE_START_CONTEXT,
  DOCTYPE_END_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

function generateDoctypeStartToken (state) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  return {
    type: TOKEN_DOCTYPE_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories) {
    const doctypeEndContext = contextFactories[DOCTYPE_END_CONTEXT](
      contextFactories
    )

    tokens.push(generateDoctypeStartToken(state))

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = doctypeEndContext
  },

  whitespace (state, tokens, contextFactories) {
    const attributesContext = contextFactories[DOCTYPE_ATTRIBUTES_CONTEXT](
      contextFactories
    )

    tokens.push(generateDoctypeStartToken(state))

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributesContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (isWhitespace(chars)) {
    return (state, tokens) => syntaxHandlers.whitespace(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeStartContextFactory (contextFactories, options) {
  return {
    factoryName: DOCTYPE_START_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
