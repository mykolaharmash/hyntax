function handleOpenTagStart (state) {
  let tagNameContext = {
    parentRef: state.currentContext,
    type: 'tag-name',
    content: []
  }

  state.currentContext.content.push(tagNameContext)
  state.currentContext = tagNameContext

  return state
}

function handleAttributeStart (state) {
  let tagAttributesContext = {
    parentRef: state.currentContext,
    type: 'attributes',
    content: []
  }

  state.currentContext.content.push(tagAttributesContext)
  state.currentContext = tagAttributesContext

  return state
}

function handleOpenTagEnd (state) {
  const SELF_CLOSING_TAGS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]

  let tagName = state.openedTagsPull[state.openedTagsPull.length - 1]

  if (SELF_CLOSING_TAGS.includes(tagName)) {
    state.openedTagsPull.pop()
    state.currentContext = state.currentContext.parentRef
    state.caretPosition++

    return state
  }

  let tagContentContext = {
    parentRef: state.currentContext,
    type: 'tag-content',
    content: []
  }

  state.currentContext.content.push(tagContentContext)
  state.currentContext = tagContentContext
  state.caretPosition++

  return state
}

function handleCloseTag (state) {
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function parseTagContext (token, state) {
  let handlerResult

  if (token.type === 'open-tag-start') {
    handlerResult = handleOpenTagStart(state)
  }

  const ATTRIBUTE_START_TOKENS = [
    'attribute-key',
    'attribute-assignment'
  ]

  if (ATTRIBUTE_START_TOKENS.includes(token.type)) {
    handlerResult = handleAttributeStart(state)
  }


  if (token.type === 'open-tag-end') {
    handlerResult = handleOpenTagEnd(state)
  }

  if (token.type === 'close-tag') {
    handlerResult = handleCloseTag(state)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
