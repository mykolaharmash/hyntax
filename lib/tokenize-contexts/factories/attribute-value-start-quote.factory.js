/**
 * @typedef {Object} AttributeValueStartQuoteContextFactoryOptions
 * @property {String} switchToOnQuotationMark
 */

let { addToken, update } = require('../../helpers')
const {
  TOKEN_ATTRIBUTE_VALUE_QUOTE_START
} = require('../../constants/token-types')

/**
 * @param {AttributeValueStartQuoteContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    quotationMark (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
        content: state.decisionBuffer
      })

      updatedState = update(state, {
        accumulatedContent: '',
        decisionBuffer: '',
        currentContextType: options.switchToOnQuotationMark
      })

      return { updatedState, updatedTokens }
    }
  }
}

function parseSyntax (chars, syntaxHandlers) {
  if (chars === '"') {
    return syntaxHandlers.quotationMark
  }
}

/**
 * @param {AttributeValueStartQuoteContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnQuotationMark) {
    throw new Error(
      'switchToOnQuotationMark option was not specified for ' +
      'attributeValueStartQuoteContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'current context handles quotation mark (") symbol.'
    )
  }
}

/**
 * @param {AttributeValueStartQuoteContextFactoryOptions} options
 */
module.exports = function attributeValueStartQuoteContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
