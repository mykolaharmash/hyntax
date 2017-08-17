let util = require('util')

let tokens = [
  { type: 'text', content: 'st\n\n' },
  { type: 'open-tag-start', content: '<div' },
  { type: 'attribute-key', content: 'class' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'some class' },
  { type: 'attribute-value-end-quote', content: '"' },
  { type: 'attribute-key', content: 'disabled' },
  { type: 'attribute-key', content: 'custom' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'attri>bute' },
  { type: 'attribute-value-end-quote', content: '"' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '\n\n  rsdjfkl < jsdfljdsf\n\n  ' },
  { type: 'open-tag-start', content: '<some-component' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '' },
  { type: 'close-tag', content: '</some-component>' },
  { type: 'text', content: '\n\n  ' },
  { type: 'open-tag-start', content: '<br' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '\n\n  ' },
  { type: 'open-tag-start', content: '<img' },
  { type: 'open-tag-end', content: '/>' },
  { type: 'text', content: '\n\n  ' },
  { type: 'open-tag-start', content: '<span' },
  { type: 'open-tag-end', content: '>' },
  {
    type: 'text',
    content: 'sldflksdjf sldfjlsdkjf sdlkfjdslkfj '
  },
  { type: 'close-tag', content: '</span>' },
  { type: 'text', content: '\n\n  sdlkfjklsdfj\n\n' }
]

function cloneState (state) {
  return Object.assign({}, state)
}

let tagContentParser = function (token, state) {
  let updatedState = cloneState(state)

  if (token.type === 'open-tag-start') {
    let tagContext = {
      parentRef: state.currentContext,
      type: 'tag',
      content: []
    }

    updatedState.currentContext.content.push(tagContext)
    updatedState.currentContext = tagContext

    return updatedState
  }

  updatedState.currentContext.content.push(token)
  updatedState.caretPosition++

  return updatedState
}

let tagParser = function (token, state) {
  let updatedState = cloneState(state)

  if (token.type === 'open-tag-start') {
    let tagNameContext = {
      parentRef: state.currentContext,
      type: 'tag-name',
      content: []
    }

    updatedState.currentContext.content.push(tagNameContext)
    updatedState.currentContext = tagNameContext

    return updatedState
  }

  updatedState.currentContext.content.push(token)
  updatedState.caretPosition++

  return updatedState
}

let tagNameParser = function (token, state) {
  let updatedState = cloneState(state)

  if (token.type !== 'open-tag-start') {
    updatedState.currentContext = state.currentContext.parentRef

    return updatedState
  }

  updatedState.currentContext.content.push(token)
  updatedState.caretPosition++

  return updatedState
}

let parsersMap = {
  'tag-content': tagContentParser,
  'tag': tagParser,
  'tag-name': tagNameParser
}

function parse () {
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

  while (state.caretPosition < tokens.length) {
    let token = tokens[state.caretPosition]
    let parser = parsersMap[state.currentContext.type]

    state = parser(token, state)
  }

  console.log(util.inspect(rootContext, { showHidden: true, depth: null }))
}

parse()
