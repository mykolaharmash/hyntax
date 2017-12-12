const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const {
  ATTRIBUTE_ASSIGNMENT_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  equal (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributeValueContext = contextFactories[ATTRIBUTE_VALUE_CONTEXT](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributeValueContext
    })

    return { updatedState, updatedTokens }
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
