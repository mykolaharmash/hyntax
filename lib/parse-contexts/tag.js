const {
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const {
  TAG_NAME_CONTEXT,
  ATTRIBUTES_CONTEXT,
  TAG_CONTENT_CONTEXT
} = require('../constants/parser-contexts')

function handleOpenTagStart (state) {
  let tagNameContext = {
    parentRef: state.currentContext,
    type: TAG_NAME_CONTEXT,
    content: []
  }

  state.currentContext.content.push(tagNameContext)
  state.currentContext = tagNameContext

  return state
}

function handleAttributeStart (state) {
  let tagAttributesContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTES_CONTEXT,
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
    type: TAG_CONTENT_CONTEXT,
    content: []
  }

  state.currentContext.content.push(tagContentContext)
  state.currentContext = tagContentContext
  state.caretPosition++

  return state
}

function handleCloseTag (state, token) {
  state.currentContext.content.push(token)
  state.currentContext = state.currentContext.parentRef
  state.caretPosition++

  return state
}

module.exports = function parseTagContext (token, state) {
  let handlerResult

  if (token.type === TOKEN_OPEN_TAG_START) {
    handlerResult = handleOpenTagStart(state)
  }

  const ATTRIBUTE_START_TOKENS = [
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]

  if (ATTRIBUTE_START_TOKENS.includes(token.type)) {
    handlerResult = handleAttributeStart(state)
  }


  if (token.type === TOKEN_OPEN_TAG_END) {
    handlerResult = handleOpenTagEnd(state)
  }

  if (token.type === TOKEN_CLOSE_TAG) {
    handlerResult = handleCloseTag(state, token)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
