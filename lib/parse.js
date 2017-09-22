let clearContext = require('./helpers').clearContext

const parseTagContext = require('./parse-contexts/tag')
const parseTagContentContext = require('./parse-contexts/tag-content')
const parseTagNameContext = require('./parse-contexts/tag-name')
const parseAttributesContext = require('./parse-contexts/attributes')
const parseAttributeContext = require('./parse-contexts/attribute')
const parseAttributeValueContext = require('./parse-contexts/attribute-value')

const {
  TAG_CONTENT_CONTEXT,
  TAG_CONTEXT,
  TAG_NAME_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT
} = require('./constants/parser-contexts')

const parsersMap = {
  [TAG_CONTENT_CONTEXT]: parseTagContentContext,
  [TAG_CONTEXT]: parseTagContext,
  [TAG_NAME_CONTEXT]: parseTagNameContext,
  [ATTRIBUTES_CONTEXT]: parseAttributesContext,
  [ATTRIBUTE_CONTEXT]: parseAttributeContext,
  [ATTRIBUTE_VALUE_CONTEXT]: parseAttributeValueContext
}

function parseTokens (tokens, state) {
  while (state.caretPosition < tokens.length) {
    let token = tokens[state.caretPosition]
    let contextParse = parsersMap[state.currentContext.type]

    state = contextParse(token, state)
  }

  return state
}

module.exports = function parse (tokens = []) {
  let rootContext = {
    parentRef: undefined,
    type: TAG_CONTENT_CONTEXT,
    content: []
  }

  let state = {
    openedTagsPull: [],
    caretPosition: 0,
    currentContext: rootContext
  }

  parseTokens(tokens, state)

  return clearContext(rootContext)
}
