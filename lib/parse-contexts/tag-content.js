const parseOpenTagName = require('../helpers').parseOpenTagName
const parseCloseTagName = require('../helpers').parseCloseTagName

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_START,
  TOKEN_DOCTYPE_START
} = require('../constants/token-types')
const {
  TAG_CONTEXT,
  COMMENT_CONTEXT,
  DOCTYPE_CONTEXT
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

function handleCommentStart (state) {
  let commentContext = {
    parentRef: state.currentContext,
    type: COMMENT_CONTEXT,
    content: []
  }

  state.currentContext.content.push(commentContext)
  state.currentContext = commentContext

  return state
}

function handleDoctypeStart (state) {
  let doctypeContext = {
    parentRef: state.currentContext,
    type: DOCTYPE_CONTEXT,
    content: []
  }

  state.currentContext.content.push(doctypeContext)
  state.currentContext = doctypeContext

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

  if (token.type === TOKEN_COMMENT_START) {
    handlerResult = handleCommentStart(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_START) {
    handlerResult = handleDoctypeStart(state, token)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
