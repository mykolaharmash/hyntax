const { calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const {
  ATTRIBUTE_ASSIGNMENT_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  equal (state, tokens, contextFactories, options) {
    const attributeValueContext = contextFactories[ATTRIBUTE_VALUE_CONTEXT](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    tokens.push({
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.decisionBuffer = ''
    state.currentContext = attributeValueContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '=') {
    return (state, tokens) => syntaxHandlers.equal(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeKeyContextFactory (contextFactories, options) {
  return {
    factoryName: ATTRIBUTE_ASSIGNMENT_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
