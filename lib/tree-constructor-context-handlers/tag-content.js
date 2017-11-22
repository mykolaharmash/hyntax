const parseCloseTagName = require('../helpers').parseCloseTagName

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_START,
  TOKEN_DOCTYPE_START,
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_START_STYLE
} = require('../constants/token-types')
const {
  TAG_CONTEXT,
  COMMENT_CONTEXT,
  DOCTYPE_CONTEXT,
  SCRIPT_TAG_CONTEXT,
  STYLE_TAG_CONTEXT
} = require('../constants/tree-constructor-contexts')
const {
  NODE_TAG,
  NODE_TEXT,
  NODE_DOCTYPE,
  NODE_COMMENT,
  NODE_SCRIPT,
  NODE_STYLE
} = require('../constants/ast-nodes')

function handleOpenTagStart (state) {
  if (state.currentNode.content.children === undefined) {
    state.currentNode.content.children = []
  }

  const tagNode = {
    nodeType: NODE_TAG,
    parentRef: state.currentNode,
    content: {}
  }

  state.currentNode.content.children.push(tagNode)

  state.currentNode = tagNode
  state.currentContext = {
    parentRef: state.currentContext,
    type: TAG_CONTEXT
  }

  return state
}

function handleCloseTag (state, token) {
  const closeTagName = parseCloseTagName(token.content)

  if (closeTagName !== state.currentNode.content.name) {
    state.caretPosition++

    return state
  }

  state.currentContext = state.currentContext.parentRef

  return state
}

function handleCommentStart (state) {
  if (state.currentNode.content.children === undefined) {
    state.currentNode.content.children = []
  }

  const commentNode = {
    nodeType: NODE_COMMENT,
    parentRef: state.currentNode,
    content: {}
  }

  state.currentNode.content.children.push(commentNode)

  state.currentNode = commentNode
  state.currentContext = {
    parentRef: state.currentContext,
    type: COMMENT_CONTEXT
  }

  return state
}

function handleDoctypeStart (state) {
  if (state.currentNode.content.children === undefined) {
    state.currentNode.content.children = []
  }

  const doctypeNode = {
    nodeType: NODE_DOCTYPE,
    parentRef: state.currentNode,
    content: {}
  }

  state.currentNode.content.children.push(doctypeNode)

  state.currentNode = doctypeNode
  state.currentContext = {
    parentRef: state.currentContext,
    type: DOCTYPE_CONTEXT
  }

  return state
}

function handleText (state, token) {
  if (state.currentNode.content.children === undefined) {
    state.currentNode.content.children = []
  }

  const textNode = {
    nodeType: NODE_TEXT,
    parentRef: state.currentNode,
    content: {
      value: token
    }
  }

  state.currentNode.content.children.push(textNode)
  state.caretPosition++

  return state
}

function handleOpenTagStartScript (state) {
  if (state.currentNode.content.children === undefined) {
    state.currentNode.content.children = []
  }

  const scriptNode = {
    nodeType: NODE_SCRIPT,
    parentRef: state.currentNode,
    content: {}
  }

  state.currentNode.content.children.push(scriptNode)

  state.currentNode = scriptNode
  state.currentContext = {
    type: SCRIPT_TAG_CONTEXT,
    parentRef: state.currentContext
  }

  return state
}

function handleOpenTagStartStyle (state) {
  if (state.currentNode.content.children === undefined) {
    state.currentNode.content.children = []
  }

  const styleNode = {
    nodeType: NODE_STYLE,
    parentRef: state.currentNode,
    content: {}
  }

  state.currentNode.content.children.push(styleNode)

  state.currentNode = styleNode
  state.currentContext = {
    type: STYLE_TAG_CONTEXT,
    parentRef: state.currentContext
  }

  return state
}

module.exports = function tagContent (token, state) {
  if (token.type === TOKEN_OPEN_TAG_START) {
    return handleOpenTagStart(state, token)
  }

  if (token.type === TOKEN_TEXT) {
    return handleText(state, token)
  }

  if (token.type === TOKEN_CLOSE_TAG) {
    return handleCloseTag(state, token)
  }

  if (token.type === TOKEN_COMMENT_START) {
    return handleCommentStart(state, token)
  }

  if (token.type === TOKEN_DOCTYPE_START) {
    return handleDoctypeStart(state, token)
  }

  if (token.type === TOKEN_OPEN_TAG_START_SCRIPT) {
    return handleOpenTagStartScript(state, token)
  }

  if (token.type === TOKEN_OPEN_TAG_START_STYLE) {
    return handleOpenTagStartStyle(state, token)
  }

  state.caretPosition++

  return state
}
