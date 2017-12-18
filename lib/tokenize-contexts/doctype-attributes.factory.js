const { isWhitespace } = require('../helpers')

const {
  DOCTYPE_ATTRIBUTES_CONTEXT,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT,
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  DOCTYPE_END_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories) {
    const doctypeAttributeWrappedStartContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_START_CONTEXT](
      contextFactories,
      { wrapper: state.decisionBuffer }
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = doctypeAttributeWrappedStartContext
  },

  bare (state, tokens, contextFactories) {
    const doctypeAttributeBareStartContext = contextFactories[DOCTYPE_ATTRIBUTE_BARE_CONTEXT](
      contextFactories
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = doctypeAttributeBareStartContext
  },

  closingCornerBrace (state, tokens, contextFactories) {
    const doctypeEndContext = contextFactories[DOCTYPE_END_CONTEXT](
      contextFactories
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = doctypeEndContext
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
