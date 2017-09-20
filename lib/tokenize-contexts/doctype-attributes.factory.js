const { update, isWhitespace } = require('../helpers')

const {
  DOCTYPE_ATTRIBUTES_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY,
  DOCTYPE_ATTRIBUTE_BARE_FACTORY,
  DOCTYPE_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const doctypeAttributeWrappedStartContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY](
      contextFactories,
      { wrapper: state.decisionBuffer }
    )

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributeWrappedStartContext
    })

    return { updatedState, updatedTokens }
  },

  bare (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens

    const doctypeAttributeBareStartContext = contextFactories[DOCTYPE_ATTRIBUTE_BARE_FACTORY](
      contextFactories
    )

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributeBareStartContext
    })

    return { updatedState, updatedTokens }
  },

  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens

    const doctypeEndContext = contextFactories[DOCTYPE_END_FACTORY](
      contextFactories
    )

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeEndContext
    })

    return { updatedState, updatedTokens }
  },
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '"' || chars === '\'') {
    return (state, tokens) => syntaxHandlers.wrapper(
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

  if (!isWhitespace(chars)) {
    return (state, tokens) => syntaxHandlers.bare(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributesContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTES_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
