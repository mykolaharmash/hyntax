const { isWhitespace, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
  DOCTYPE_ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

const syntaxHandlers = {
  attributeEnd (state, tokens, contextFactories, options) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const doctypeAttributesContext = contextFactories[DOCTYPE_ATTRIBUTES_CONTEXT](
      contextFactories,
      options
    )

    tokens.push({
      type: TOKEN_DOCTYPE_ATTRIBUTE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = doctypeAttributesContext
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (isWhitespace(chars) || chars === '>') {
    return (state, tokens) => syntaxHandlers.attributeEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributeBareContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_BARE_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
