let { update } = require('../helpers')

const {
  ATTRIBUTE_VALUE_FACTORY,
  ATTRIBUTES_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
  ATTRIBUTE_VALUE_BARE_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    const attributeValueWrappedStartContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_START_FACTORY](
      contextFactories,
      Object.assign({}, options, { wrapper: state.decisionBuffer })
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueWrappedStartContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  bare (state, tokens, contextFactories, options) {
    const attributeValueBareContext = contextFactories[ATTRIBUTE_VALUE_BARE_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueBareContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  tagEnd (state, tokens, contextFactories, options) {
    const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens: tokens }
  }
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

  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const BARE_VALUE_PATTERN = /\S/

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
    factoryName: ATTRIBUTE_VALUE_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
