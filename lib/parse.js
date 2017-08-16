let cloneState = require('./helpers').cloneState
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

let tagContentParser = function (token, context, openedTagsPull) {
  let updatedContext = {}

  if (token.type === 'open-tag-start') {
    let tagContext = {
      type: 'tag',
      content: []
    }

    updatedContext.parentRef = context.currentRef
    updatedContext.currentRef = tagContext

    return updatedContext
  }

  return context
}

let tagParser = function (token, context) {
  return context
}

let parsersMap = {
  'tag-content': tagContentParser,
  'tag': tagParser
}

function parse () {
  let rootContext = {
    type: 'tag-content',
    content: []
  }

  let openedTagsPull = []
  let caretPosition = 0

  let context = {
    parentRef: undefined,
    currentRef: rootContext
  }

  while (caretPosition < tokens.length) {
    let token = tokens[caretPosition]
    let currentContextRef = context.currentRef
    let parser = parsersMap[currentContextRef.type]

    context = parser(token, context, openedTagsPull)

    if (context.currentRef === currentContextRef) {
      context.currentRef.content.push(token)
    } else {
      if (context.currentRef === undefined) {
        context.currentRef = context.parentRef
        context.parentRef = context.currentRef.parentRef
      } else {
        currentContextRef.content.push(context.currentRef)
      }

      caretPosition--
    }

    caretPosition++
  }

  console.log(util.inspect(rootContext, { showHidden: true, depth: null }))
}

parse()
