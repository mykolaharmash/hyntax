const parseOpenTagName = require('../helpers').parseOpenTagName
const parseCloseTagName = require('../helpers').parseCloseTagName

function handleOpenTagStart (state, token) {
  let tagName = parseOpenTagName(token.content)

  state.openedTagsPull.push(tagName)

  let tagContext = {
    parentRef: state.currentContext,
    type: 'tag',
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

  if (token.type === 'open-tag-start') {
    handlerResult = handleOpenTagStart(state, token)
  }

  if (token.type === 'close-tag') {
    handlerResult = handleMatchingCloseTag(state, token)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
