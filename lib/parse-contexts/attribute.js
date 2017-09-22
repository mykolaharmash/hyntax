const {
  TOKEN_OPEN_TAG_END,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_CONTEXT
} = require('../constants/parser-contexts')

function handleOpenTagEnd (state) {
  state.currentContext = state.currentContext.parentRef

  return state
}

function handleAttributeKey (state) {
  let alreadyHasKey = state.currentContext.content.some((item) => {
    return item.type === TOKEN_ATTRIBUTE_KEY
  })

  if (alreadyHasKey) {
    state.currentContext = state.currentContext.parentRef

    return state
  }
}

function handleAttributeAssignment (state) {
  let alreadyHasValue = state.currentContext.content.some((item) => {
    return item.type === ATTRIBUTE_VALUE_CONTEXT
  })

  if (alreadyHasValue) {
    state.currentContext = state.currentContext.parentRef

    return state
  }

  let tagAttributeValueContext = {
    parentRef: state.currentContext,
    type: ATTRIBUTE_VALUE_CONTEXT,
    content: []
  }

  state.currentContext.content.push(tagAttributeValueContext)
  state.currentContext = tagAttributeValueContext
  state.caretPosition++

  return state
}

module.exports = function parseAttributeContext (token, state) {
  let handlerResult

  if (token.type === TOKEN_OPEN_TAG_END) {
    handlerResult = handleOpenTagEnd(state)
  }

  if (token.type === TOKEN_ATTRIBUTE_KEY) {
    handlerResult = handleAttributeKey(state)
  }

  if (token.type === TOKEN_ATTRIBUTE_ASSIGNMENT) {
    handlerResult = handleAttributeAssignment(state)
  }

  if (!handlerResult) {
    state.currentContext.content.push(token)
    state.caretPosition++
  }

  return state
}
