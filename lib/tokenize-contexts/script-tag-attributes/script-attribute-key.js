const attributeKeyContextFactory = require('../factories/attribute-key.factory')
const {
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTES
} = require('../../constants/tokenizer-contexts')

module.exports = attributeKeyContextFactory({
  switchToOnKeyEnd: TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTES
})
