let clearContext = require('./helpers').clearContext

let parseTagContext = require('./parse-contexts/tag')
let parseTagContentContext = require('./parse-contexts/tag-content')
let parseTagNameContext = require('./parse-contexts/tag-name')
let parseAttributesContext = require('./parse-contexts/attributes')
let parseAttributeContext = require('./parse-contexts/attribute')
let parseAttributeValueContext = require('./parse-contexts/attribute-value')

let parsersMap = {
  'tag-content': parseTagContentContext,
  'tag': parseTagContext,
  'tag-name': parseTagNameContext,
  'attributes': parseAttributesContext,
  'attribute': parseAttributeContext,
  'attribute-value': parseAttributeValueContext
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
    type: 'tag-content',
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
