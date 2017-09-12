const { update } = require('../helpers')

const openTagEndContextFactory = require('./open-tag-end.factory')
const attributeAssignmentContextFactory = require('./attribute-assignment.factory')
const attributeKeyContextFactory = require('./attribute-key.factory')

const syntaxHandlers = {
  tagEnd (state, tokens, options) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: openTagEndContextFactory(options)
    })

    return { updatedState, updatedTokens: tokens }
  },

  noneWhitespace (state, tokens, options) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeKeyContextFactory(options)
    })

    return { updatedState, updatedTokens: tokens }
  },

  equal (state, tokens, options) {
    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeAssignmentContextFactory(options)
    })

    return { updatedState, updatedTokens: tokens }
  }
}

function parseSyntax (chars, syntaxHandlers, options) {
  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(state, tokens, options)
  }

  if (chars === '=') {
    return (state, tokens) => syntaxHandlers.equal(state, tokens, options)
  }

  const ATTRIBUTE_KEY_PATTERN = /^\S/

  if (ATTRIBUTE_KEY_PATTERN.test(chars)) {
    return (state, tokens) => {
      return syntaxHandlers.noneWhitespace(state, tokens, options)
    }
  }
}

module.exports = function attributesContextFactory (options) {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers, options)
  }
}
