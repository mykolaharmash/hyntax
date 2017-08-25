let fs = require('fs')
let util = require('util')

let tokens = [
  { type: 'text', content: 'st\n\n' },
  { type: 'open-tag-start', content: '<div' },
  { type: 'attribute-key', content: 'class' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-apostrophe', content: '\'' },
  {
    type: 'attribute-value-apostrophe',
    content: 'apostrophe-class'
  },
  { type: 'attribute-value-end-apostrophe', content: '\'' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '\n  some content\n' },
  { type: 'close-tag', content: '</div>' },
  { type: 'text', content: '\n\n' },
  { type: 'open-tag-start', content: '<div' },
  { type: 'attribute-key', content: '"-test"' },
  { type: 'attribute-key', content: 'class' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'some class' },
  { type: 'attribute-value-end-quote', content: '"' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'some more' },
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
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'some thing' },
  { type: 'attribute-value-end-quote', content: '"' },
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

function parseOpenTagName (openTagStartTokenContent) {
  const PATTERN = /^<(.+)/

  let match = openTagStartTokenContent.match(PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse open tag name.\n' +
      `${ openTagStartTokenContent } does not match pattern of opening tag.`
    )
  }

  return match[1]
}

function parseCloseTagName (closeTagTokenContent) {
  const PATTERN = /^<\/(.+)>$/

  let match = closeTagTokenContent.match(PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse close tag name.\n' +
      `${ closeTagTokenContent } does not match pattern of closing tag.`
    )
  }

  return match[1].trim()
}

let tagContentParser = function (token, state) {
  let updatedState = cloneState(state)

  if (token.type === 'open-tag-start') {
    let tagName = parseOpenTagName(token.content)

    state.openedTagsPull.push(tagName)

    let tagContext = {
      parentRef: state.currentContext,
      type: 'tag',
      content: []
    }

    updatedState.currentContext.content.push(tagContext)
    updatedState.currentContext = tagContext

    return updatedState
  }

  if (token.type === 'close-tag') {
    let currentOpenedTag = state.openedTagsPull[state.openedTagsPull.length - 1]
    let closeTagName = parseCloseTagName(token.content)

    if (closeTagName === currentOpenedTag) {
      updatedState.openedTagsPull.pop()
      updatedState.currentContext = state.currentContext.parentRef

      return updatedState
    }
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

  const ATTRIBUTE_START_TOKENS = [
    'attribute-key',
    'attribute-assignment'
  ]

  if (ATTRIBUTE_START_TOKENS.includes(token.type)) {
    let tagAttributesContext = {
      parentRef: state.currentContext,
      type: 'attributes',
      content: []
    }

    updatedState.currentContext.content.push(tagAttributesContext)
    updatedState.currentContext = tagAttributesContext

    return updatedState
  }

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

  if (token.type === 'open-tag-end') {
    let tagName = state.openedTagsPull[state.openedTagsPull.length - 1]

    if (SELF_CLOSING_TAGS.includes(tagName)) {
      updatedState.openedTagsPull.pop()
      updatedState.currentContext = state.currentContext.parentRef
      updatedState.caretPosition++

      return updatedState
    }

    let tagContentContext = {
      parentRef: state.currentContext,
      type: 'tag-content',
      content: []
    }

    updatedState.currentContext.content.push(tagContentContext)
    updatedState.currentContext = tagContentContext
    updatedState.caretPosition++

    return updatedState
  }

  if (token.type === 'close-tag') {
    updatedState.currentContext = state.currentContext.parentRef
    updatedState.caretPosition++

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

let attributesParser = function (token, state) {
  let updatedState = cloneState(state)

  const ATRIBBUTE_ITEM_START_TOKENS = [
    'attribute-key',
    'attribute-assignment'
  ]

  if (ATRIBBUTE_ITEM_START_TOKENS.includes(token.type)) {
    let tagAttributeItemContext = {
      parentRef: state.currentContext,
      type: 'attribute',
      content: []
    }

    updatedState.currentContext.content.push(tagAttributeItemContext)
    updatedState.currentContext = tagAttributeItemContext

    return updatedState
  }

  if (token.type === 'open-tag-end') {
    updatedState.currentContext = state.currentContext.parentRef

    return updatedState
  }

  updatedState.currentContext.content.push(token)
  updatedState.caretPosition++

  return updatedState
}

function attributeParser (token, state) {
  let updatedState = cloneState(state)

  if (token.type === 'open-tag-end') {
    updatedState.currentContext = state.currentContext.parentRef

    return updatedState
  }

  if (token.type === 'attribute-key') {
    let alreadyHasKey = state.currentContext.content.some((item) => {
      return item.type === 'attribute-key'
    })

    if (alreadyHasKey) {
      updatedState.currentContext = state.currentContext.parentRef

      return updatedState
    }
  }

  if (token.type === 'attribute-assignment') {
    let alreadyHasAssignment = state.currentContext.content.some((item) => {
      return item.type === 'attribute-assignment'
    })

    if (alreadyHasAssignment) {
      updatedState.currentContext = state.currentContext.parentRef

      return updatedState
    }

    let tagAttributeValueContext = {
      parentRef: state.currentContext,
      type: 'attribute-value',
      content: []
    }

    updatedState.currentContext.content.push(tagAttributeValueContext)
    updatedState.currentContext = tagAttributeValueContext
    updatedState.caretPosition++

    return updatedState
  }

  updatedState.currentContext.content.push(token)
  updatedState.caretPosition++

  return updatedState
}

function attributeValueParser (token, state) {
  let updatedState = cloneState(state)

  const VALUE_END_TOKENS = [
    'open-tag-end',
    'attribute-key',
    'attribute-assignment'
  ]

  if (VALUE_END_TOKENS.includes(token.type)) {
    updatedState.currentContext = state.currentContext.parentRef

    return updatedState
  }

  const VALUE_TYPE_TOKENS = [
    'attribute-value-quoted',
    'attribute-value-apostrophe'
  ]

  if (VALUE_TYPE_TOKENS.includes(token.type)) {
    updatedState.currentContext.content.push(token)
  }

  updatedState.caretPosition++

  return updatedState
}

let parsersMap = {
  'tag-content': tagContentParser,
  'tag': tagParser,
  'tag-name': tagNameParser,
  'attributes': attributesParser,
  'attribute': attributeParser,
  'attribute-value': attributeValueParser
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

  console.log(util.inspect(rootContext, { showHidden: false, depth: null }))

  fs.writeFileSync(
    './parser-ats.js',
    util.inspect(rootContext, { showHidden: false, depth: null })
  )
}

parse()
