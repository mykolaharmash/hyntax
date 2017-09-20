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
  DOCTYPE_START_FACTORY,
  DOCTYPE_END_FACTORY,
  DOCTYPE_ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

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

    const doctypeEndContext = contextFactories[DOCTYPE_END_FACTORY](
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
    const attributesContext = contextFactories[DOCTYPE_ATTRIBUTES_FACTORY](
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
    factoryName: DOCTYPE_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
