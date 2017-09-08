/**
 * script-attributes context
 */

const attributesContextFactory = require('../factories/attributes.factory')
const {
  TOKENIZER_CONTEXT_OPEN_TAG_END_SCRIPT,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_KEY,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_ASSIGNMENT
} = require('../../constants/tokenizer-contexts')

module.exports = attributesContextFactory({
  switchToOnOpenTagEnd: TOKENIZER_CONTEXT_OPEN_TAG_END_SCRIPT,
  switchToOnEqual: TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_ASSIGNMENT,
  switchToOnNoneWhitespace: TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_KEY
})
