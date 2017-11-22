const {
  update,
  addToken,
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')

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
  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens

    const doctypeEndContext = contextFactories[DOCTYPE_END_CONTEXT](
      contextFactories
    )

    updatedTokens = addToken(tokens, generateDoctypeStartToken(state))

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeEndContext
    })

    return { updatedState, updatedTokens }
  },

  whitespace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[DOCTYPE_ATTRIBUTES_CONTEXT](
      contextFactories
    )

    updatedTokens = addToken(tokens, generateDoctypeStartToken(state))

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens }
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
