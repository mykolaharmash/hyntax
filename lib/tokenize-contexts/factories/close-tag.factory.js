/**
 * @typedef {Object} CloseTagContextFactoryOptions
 * @property {String} closeTagTokenType
 */

let { addToken, update } = require('../../helpers')
const {
  TOKENIZER_CONTEXT_DATA
} = require('../../constants/tokenizer-contexts')

/**
 * @param {CloseTagContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    closingCornerBrace (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: options.closeTagTokenType,
        content: `${ state.accumulatedContent }${ state.decisionBuffer }`
      })

      updatedState = update(state, {
        accumulatedContent: '',
        decisionBuffer: '',
        currentContextType: TOKENIZER_CONTEXT_DATA
      })

      return { updatedState, updatedTokens }
    }
  }
}

function parseSyntax (chars, syntaxHandlers) {
  if (chars === '>') {
    return syntaxHandlers.closingCornerBrace
  }
}

/**
 * @param {CloseTagContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.closeTagTokenType) {
    throw new Error(
      'closeTagTokenType option was not specified for closeTagContext ' +
      'factory.\n' +
      'The option specifies type of token to create when context reaches ' +
      'it\'s boundary'
    )
  }
}

/**
 * @param {CloseTagContextFactoryOptions} options
 */
module.exports = function closeTagContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
