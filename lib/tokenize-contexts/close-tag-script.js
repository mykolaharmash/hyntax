const closeTagContextFactory = require('./factories/close-tag.factory')
const { TOKEN_CLOSE_TAG_SCRIPT } = require('../constants/token-types')

module.exports = closeTagContextFactory({
  closeTagTokenType: TOKEN_CLOSE_TAG_SCRIPT
})
