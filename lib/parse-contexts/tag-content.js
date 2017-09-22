const parseOpenTagName = require('../helpers').parseOpenTagName
const parseCloseTagName = require('../helpers').parseCloseTagName

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_CLOSE_TAG
} = require('../constants/token-types')
const {
  TAG_CONTEXT
} = require('../constants/parser-contexts')

function handleOpenTagStart (state, token) {
  let tagName = parseOpenTagName(token.content)

  state.openedTagsPull.push(tagName)

  let tagContext = {
    parentRef: state.currentContext,
    type: TAG_CONTEXT,
    content: []
  }

  state.currentContext.content.push(tagContext)
  state.currentContext = tagContext

  return state
}

function handleMatchingCloseTag (state, token) {
  let currentOpenedTag = state.openedTagsPull[state.openedTagsPull.length - 1]
  let closeTagName = parseCloseTagName(token.content)

  if (closeTagName !== currentOpenedTag) {
    return undefined
  }

  state.openedTagsPull.pop()
  state.currentContext = state.currentContext.parentRef

  return state
}

module.exports = function parseTagContentContext (token, state) {
  let handlerResult

  if (token.type === TOKEN_OPEN_TAG_START) {
    handlerResult = handleOpenTagStart(state, token)
  }

  if (token.type === TOKEN_CLOSE_TAG) {
    handlerResult = handleMatchingCloseTag(state, token)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
