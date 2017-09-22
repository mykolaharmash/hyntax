/**
 * Parser for 'tag-name' context.
 * Parses tag name from 'open-tag-start' (<div)
 * token and save the tag name as self content.
 * Ignores tokens others than 'open-tag-start'.
 */

const parseOpenTagName = require('../helpers').parseOpenTagName
const {
  TOKEN_OPEN_TAG_START
} = require('../constants/token-types')

function handleTagOpenStart (state, token) {
  let tagName = parseOpenTagName(token.content)

  state.currentContext.content = tagName
  state.currentContext = state.currentContext.parentRef

  return state
}

module.exports = function parseTagNameContext (token, state) {
  if (token.type === TOKEN_OPEN_TAG_START) {
    handleTagOpenStart(state, token)
  }

  state.caretPosition++

  return state
}
