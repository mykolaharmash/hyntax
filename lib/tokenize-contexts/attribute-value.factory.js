const {
  ATTRIBUTE_VALUE_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_VALUE_WRAPPED_START_CONTEXT,
  ATTRIBUTE_VALUE_BARE_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    const attributeValueWrappedStartContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_START_CONTEXT](
      contextFactories,
      Object.assign({}, options, { wrapper: state.decisionBuffer })
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributeValueWrappedStartContext
  },

  bare (state, tokens, contextFactories, options) {
    const attributeValueBareContext = contextFactories[ATTRIBUTE_VALUE_BARE_CONTEXT](
      contextFactories,
      options
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributeValueBareContext
  },

  tagEnd (state, tokens, contextFactories, options) {
    const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
      contextFactories,
      options
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributesContext
  }
}

const BARE_VALUE_PATTERN = /\S/

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '"' || chars === '\'') {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (BARE_VALUE_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.bare(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueContextFactory (contextFactories, options) {
  return {
    factoryName: ATTRIBUTE_VALUE_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
