const {
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_OPEN_TAG_END
} = require('../constants/token-types')
const {
  ATTRIBUTE_CONTEXT
} = require('../constants/parser-contexts')

function handlerAttributeStart (state) {
  let tagAttributeItemContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTE_CONTEXT,
    content: []
  }

  state.currentContext.content.push(tagAttributeItemContext)
  state.currentContext = tagAttributeItemContext

  return state
}

function handleOpenTagEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

module.exports = function parseAttributesContext (token, state) {
  const ATTRIBUTE_START_TOKENS = [
    TOKEN_ATTRIBUTE_KEY,
    TOKEN_ATTRIBUTE_ASSIGNMENT
  ]
  let handlerResult

  if (ATTRIBUTE_START_TOKENS.includes(token.type)) {
    handlerResult = handlerAttributeStart(state)
  }

  if (token.type === TOKEN_OPEN_TAG_END) {
    handlerResult = handleOpenTagEnd(state)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
