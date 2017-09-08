const openTagEndContextFactory = require('./factories/open-tag-end.factory')
const {
  TOKEN_OPEN_TAG_END_SCRIPT
} = require('../constants/token-types')
const {
  TOKENIZER_CONTEXT_SCRIPT_TAG_CONTENT
} = require('../constants/tokenizer-contexts')

module.exports = openTagEndContextFactory({
  openTagEndTokenType: TOKEN_OPEN_TAG_END_SCRIPT,
  switchToOnClosingCornerBrace: TOKENIZER_CONTEXT_SCRIPT_TAG_CONTENT
})
