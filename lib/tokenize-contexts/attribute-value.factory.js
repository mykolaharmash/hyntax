let { update } = require('../helpers')

const attributesContextFactory = require('./attributes.factory')
const attributeValueWrappedStartContextFactory = require('./attribute-value-wrapped-start.factory')
const attributeValueBareContextFactory = require('./attribute-value-bare.factory')

const syntaxHandlers = {
  wrapper (state, tokens, options) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueWrappedStartContextFactory(
        Object.assign({}, options, { wrapper: state.decisionBuffer })
      )
    })

    return { updatedState, updatedTokens: tokens }
  },

  bare (state, tokens, options) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueBareContextFactory(options)
    })

    return { updatedState, updatedTokens: tokens }
  },

  tagEnd (state, tokens, options) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContextFactory(options)
    })

    return { updatedState, updatedTokens: tokens }
  }
}


function parseSyntax (chars, syntaxHandlers, options) {
  if (chars === '"' || chars === '\'') {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      options
    )
  }

  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(
      state,
      tokens,
      options
    )
  }

  const BARE_VALUE_PATTERN = /\S/

  if (BARE_VALUE_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.bare(
      state,
      tokens,
      options
    )
  }
}

module.exports = function attributeValueContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
