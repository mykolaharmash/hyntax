const attributeValueContextFactory = require('../factories/attribute-value.factory')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE,
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../../constants/tokenizer-contexts')

module.exports = attributeValueContextFactory({
  switchToOnQuotationMark: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START,
  switchToOnApostrophe: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START,
  switchToOnBare: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE,
  switchToOnTagEnd: TOKENIZER_CONTEXT_ATTRIBUTES
})
