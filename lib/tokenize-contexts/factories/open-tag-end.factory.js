let { update, addToken } = require('../../helpers')

/**
 * @typedef {Object} OpenTagEndContextFactoryOptions
 * @property {String} openTagEndTokenType
 * @property {String} switchToOnClosingCornerBrace
 */

/**
 * @param {OpenTagEndContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    closingCornerBrace (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: options.openTagEndTokenType,
        content: `${ state.accumulatedContent }${ state.decisionBuffer }`
      })

      updatedState = update(state, {
        accumulatedContent: '',
        decisionBuffer: '',
        currentContextType: options.switchToOnClosingCornerBrace
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
 * @param {OpenTagEndContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.openTagEndTokenType) {
    throw new Error(
      'openTagEndTokenType option was not specified for ' +
      'openTagEndContext factory.\n' +
      'The options specifies type of token to create when context ' +
      'reaches it\'s boundary.'
    )
  }

  if (!options.switchToOnClosingCornerBrace) {
    throw new Error(
      'switchToOnClosingCornerBrace option was not specified for ' +
      'openTagEndContext factory.\n' +
      'The option specifies type of next context to switch into when ' +
      'current context handles closing corner brace syntax.'
    )
  }
}

/**
 * @param {OpenTagEndContextFactoryOptions} options
 */
module.exports = function openTagEndContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
