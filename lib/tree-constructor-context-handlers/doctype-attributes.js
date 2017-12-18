const {
  DOCTYPE_ATTRIBUTE_CONTEXT
} = require('../constants/tree-constructor-contexts')

const {
  TOKEN_DOCTYPE_END,
  TOKEN_DOCTYPE_ATTRIBUTE,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START
} = require('../constants/token-types')

function handleDoctypeEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttribute (state) {
  if (state.currentNode.content.attributes === undefined) {
    state.currentNode.content.attributes = []
  }

  // new empty attribute
  state.currentNode.content.attributes.push({})

  state.currentContext = {
    type: DOCTYPE_ATTRIBUTE_CONTEXT,
    parentRef: state.currentContext
  }

  return state
}

module.exports = function doctypeAttributes (token, state) {
  if (token.type === TOKEN_DOCTYPE_END) {
    return handleDoctypeEnd(state, token)
  }

  const ATTRIBUTE_START_TOKENS = [
    TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    TOKEN_DOCTYPE_ATTRIBUTE
  ]

  if (ATTRIBUTE_START_TOKENS.indexOf(token.type) !== -1) {
    return handleAttribute(state, token)
  }

  state.caretPosition++

  return state
}
