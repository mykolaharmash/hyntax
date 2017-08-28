function parseOpenTagName (openTagStartTokenContent) {
  const PATTERN = /^<(.+)/

  let match = openTagStartTokenContent.match(PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse open tag name.\n' +
      `${ openTagStartTokenContent } does not match pattern of opening tag.`
    )
  }

  return match[1]
}

function parseCloseTagName (closeTagTokenContent) {
  const PATTERN = /^<\/(.+)>$/

  let match = closeTagTokenContent.match(PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse close tag name.\n' +
      `${ closeTagTokenContent } does not match pattern of closing tag.`
    )
  }

  return match[1].trim()
}

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
