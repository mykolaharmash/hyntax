const attributeAssignmentContextFactory = require('../factories/attribute-assignment.factory')
const {
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE,
} = require('../../constants/tokenizer-contexts')

module.exports = attributeAssignmentContextFactory({
  switchToOnEqual: TOKENIZER_CONTEXT_ATTRIBUTE_VALUE
})
