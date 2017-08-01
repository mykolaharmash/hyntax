let fs = require('fs')
let path = require('path')

let template = fs.readFileSync(path.resolve(__dirname, '../components/posts-list/posts-list.html'), 'utf8')

let chars = [...template]

function cloneState (state) {
  return JSON.parse(JSON.stringify(state))
}

// data context

let dataContextSyntaxHandlers = {
  openingCornerBrace (state) {
    return state
  },

  openingCornerBraceWithText (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'text',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'open-tag-start'

    return updatedState
  },

  openingCornerBraceWithSlash (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'text',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'close-tag'

    return updatedState
  }
}

let dataContext = {
  syntaxHandlers: dataContextSyntaxHandlers,
  parseSyntax (chars) {
    if (chars === '<') {
      return dataContextSyntaxHandlers.openingCornerBrace
    }

    const OPEN_TAG_START_PATTERN = /^<\w/

    if (OPEN_TAG_START_PATTERN.test(chars)) {
      return dataContextSyntaxHandlers.openingCornerBraceWithText
    }

    if (chars === '</') {
      return dataContextSyntaxHandlers.openingCornerBraceWithSlash
    }
  }
}

// --------

// open tag start context

let openTagStartContextSyntaxHandlers = {
  closingCornerBraceOrSlash (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'open-tag-start',
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'open-tag-end'

    return updatedState
  }
}

let openTagStartContext = {
  syntaxHandlers: openTagStartContextSyntaxHandlers,
  parseSyntax (chars) {
    if (chars === '>' || chars === '/') {
      return openTagStartContextSyntaxHandlers.closingCornerBraceOrSlash
    }
  }
}

// --------

// open tag end context

let openTagEndContextSyntaxHandlers = {
  closingCornerBrace (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'open-tag-end',
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'data'

    return updatedState
  }
}

let openTagEndContext = {
  syntaxHandlers: openTagEndContextSyntaxHandlers,
  parseSyntax (chars) {
    if (chars === '>') {
      return openTagEndContextSyntaxHandlers.closingCornerBrace
    }
  }
}

// --------

// close tag context

let closeTagContextSyntaxHandlers = {
  closingCornerBrace (state) {
     let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: 'close-tag',
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState.accumulatedContent = ''
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = 'data'

    return updatedState
  }
}

let closeTagContext = {
  syntaxHandlers: closeTagContextSyntaxHandlers,
  parseSyntax (chars) {
    if (chars === '>') {
      return closeTagContextSyntaxHandlers.closingCornerBrace
    }
  }
}

// --------


let contextsMap = {
  'data': dataContext,
  'open-tag-start': openTagStartContext,
  'open-tag-end': openTagEndContext,
  'close-tag': closeTagContext
}

let state = {
  currentContextType: 'data',
  decisionBuffer: '',
  accumulatedContent: '',
  tokens: [],
  chars: chars,
  caretPosition: 0
}

while (state.caretPosition < state.chars.length) {
  let char = state.chars[state.caretPosition]
  let currentContext = contextsMap[state.currentContextType]

  state.decisionBuffer += char

  let syntaxHandler = currentContext.parseSyntax(state.decisionBuffer)

  if (!syntaxHandler) {
    state.accumulatedContent += state.decisionBuffer
    state.decisionBuffer = ''
  } else {
    state = syntaxHandler(state)
  }

  state.caretPosition++
}

console.log(state)
