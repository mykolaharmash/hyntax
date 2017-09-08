/**
 * @typedef {Object} AttributeKeyContextFactoryOptions
 * @property {String} switchToOnKeyEnd
 */

let { addToken, update } = require('../../helpers')
const { TOKEN_ATTRIBUTE_KEY } = require('../../constants/token-types')

/**
 * @param {AttributeKeyContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    keyEnd (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: TOKEN_ATTRIBUTE_KEY,
        content: state.accumulatedContent
      })

      updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnKeyEnd
      })

      return { updatedState, updatedTokens }
    }
  }
}

function parseSyntax (chars, syntaxHandlers) {
  const KEY_BREAK_CHARS = [' ', '\n', '\t', '=', '/', '>']

  if (KEY_BREAK_CHARS.includes(chars)) {
    return syntaxHandlers.keyEnd
  }
}

/**
 * @param {AttributeKeyContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnKeyEnd) {
    throw new Error(
      'switchToOnKeyEnd option was not specified for attributeKeyContext ' +
      'factory.\n' +
      'The option specifies type of context to switch into when ' +
      'current context handles character which ends an attribute key.'
    )
  }
}

/**
 * @param {AttributeKeyContextFactoryOptions} options
 */
module.exports = function attributeKeyContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
