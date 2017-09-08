/**
 * @typedef {Object} AttributeValueQuoteContextFactoryOptions
 * @property {String} switchToOnQuotationMark
 */

let { addToken, update } = require('../../helpers')
const {
  TOKEN_ATTRIBUTE_VALUE_QUOTE
} = require('../../constants/token-types')

/**
 * @param {AttributeValueQuoteContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    quotationMark (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
        content: state.accumulatedContent
      })

      updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
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
 * @param {AttributeValueQuoteContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnQuotationMark) {
    throw new Error(
      'switchToOnQuotationMark option was not specified for ' +
      'attributeValueQuoteContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'current context finds quotation mark (") symbol.'
    )
  }
}

/**
 * @param {AttributeValueQuoteContextFactoryOptions} options
 */
module.exports = function attributeValueQuoteContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
