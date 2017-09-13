const { update } = require('../helpers')

const {
  ATTRIBUTES_FACTORY,
  OPEN_TAG_END_FACTORY,
  ATTRIBUTE_ASSIGNMENT_FACTORY,
  ATTRIBUTE_KEY_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  tagEnd (state, tokens, contextFactories, options) {
    const openTagEndContext = contextFactories[OPEN_TAG_END_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: openTagEndContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  noneWhitespace (state, tokens, contextFactories, options) {
    const attributeKeyContext = contextFactories[ATTRIBUTE_KEY_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeKeyContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  equal (state, tokens, contextFactories, options) {
    const attributeAssignmentContext = contextFactories[ATTRIBUTE_ASSIGNMENT_FACTORY](
      contextFactories,
      options
    )

    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeAssignmentContext
    })

    return { updatedState, updatedTokens: tokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '=') {
    return (state, tokens) => syntaxHandlers.equal(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const ATTRIBUTE_KEY_PATTERN = /^\S/

  if (ATTRIBUTE_KEY_PATTERN.test(chars)) {
    return (state, tokens) => {
      return syntaxHandlers.noneWhitespace(
        state,
        tokens,
        contextFactories,
        options
      )
    }
  }
}

module.exports = function attributesContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTES_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
