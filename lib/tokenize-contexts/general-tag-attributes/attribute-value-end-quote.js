const attributeValueEndQuoteContextFactory = require('../factories/attribute-value-end-quote.factory')
const {
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../../constants/tokenizer-contexts')

module.exports = attributeValueEndQuoteContextFactory({
  switchToOnQuotationMark: TOKENIZER_CONTEXT_ATTRIBUTES
})
