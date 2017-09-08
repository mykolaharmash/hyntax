const attributeValueStartQuoteContextFactory = require('../factories/attribute-value-start-quote.factory')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE
} = require('../../constants/tokenizer-contexts')

module.exports = attributeValueStartQuoteContextFactory({
  switchToOnQuotationMark: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE
})
