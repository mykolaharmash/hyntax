const {
  ATTRIBUTES_CONTEXT,
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTE_ASSIGNMENT_CONTEXT,
  ATTRIBUTE_KEY_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  tagEnd (state, tokens, contextFactories, options) {
    const openTagEndContext = contextFactories[OPEN_TAG_END_CONTEXT](
      contextFactories,
      options
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = openTagEndContext
  },

  noneWhitespace (state, tokens, contextFactories, options) {
    const attributeKeyContext = contextFactories[ATTRIBUTE_KEY_CONTEXT](
      contextFactories,
      options
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributeKeyContext
  },

  equal (state, tokens, contextFactories, options) {
    const attributeAssignmentContext = contextFactories[ATTRIBUTE_ASSIGNMENT_CONTEXT](
      contextFactories,
      options
    )

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = attributeAssignmentContext
  }
}

const ATTRIBUTE_KEY_PATTERN = /^\S/

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
    factoryName: ATTRIBUTES_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
