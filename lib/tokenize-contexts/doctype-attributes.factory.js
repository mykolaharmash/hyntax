const { update, isWhitespace } = require('../helpers')

const {
  DOCTYPE_ATTRIBUTES_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  DOCTYPE_END_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const doctypeAttributeWrappedStartContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT](
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

    const doctypeAttributeBareStartContext = contextFactories[DOCTYPE_ATTRIBUTE_BARE_CONTEXT](
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

    const doctypeEndContext = contextFactories[DOCTYPE_END_CONTEXT](
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
    factoryName: DOCTYPE_ATTRIBUTES_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
