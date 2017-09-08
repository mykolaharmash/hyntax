const attributeKeyContextFactory = require('../factories/attribute-key.factory')
const {
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../../constants/tokenizer-contexts')

module.exports = attributeKeyContextFactory({
  switchToOnKeyEnd: TOKENIZER_CONTEXT_ATTRIBUTES
})
