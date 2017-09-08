/**
 * @typedef {Object} AttributeValueEndQuoteContextFactoryOptions
 * @property {String} switchToOnQuotationMark
 */

let { addToken, update } = require('../../helpers')
const {
  TOKEN_ATTRIBUTE_VALUE_QUOTE_END
} = require('../../constants/token-types')

/**
 * @param {AttributeValueEndQuoteContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    quotationMark (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: TOKEN_ATTRIBUTE_VALUE_QUOTE_END,
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
 * @param {AttributeValueEndQuoteContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnQuotationMark) {
    throw new Error(
      'switchToOnQuotationMark option was not specified for ' +
      'attributeValueEndQuoteContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'current context finds quotation mark (") symbol.'
    )
  }
}

/**
 * @param {AttributeValueEndQuoteContextFactoryOptions} options
 */
module.exports = function attributeValueEndQuoteContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
