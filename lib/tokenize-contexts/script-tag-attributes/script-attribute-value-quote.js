const attributeValueQuoteContextFactory = require('../factories/attribute-value-quote.factory')
const {
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE_END
} = require('../../constants/tokenizer-contexts')

module.exports = attributeValueQuoteContextFactory({
  switchToOnQuotationMark: TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE_END
})
