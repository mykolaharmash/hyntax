const {
  update,
  addToken,
  parseOpenTagName,
  isWhitespace
} = require('../helpers')

const attributesContextFactory = require('./attributes.factory')
const openTagEndContextFactory = require('./open-tag-end.factory')

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_START_SCRIPT
} = require('../constants/token-types')

function handleTagEndAfterScriptOpenTagStart (state, tokens) {
  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: openTagEndContextFactory({ tagName: 'script' })
  })

  return { updatedState, updatedTokens }
}

function handleTagEndAfterOpenTagStart (state, tokens) {
  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: openTagEndContextFactory({ tagName: undefined })
  })

  return { updatedState, updatedTokens }
}

function handleWhitespaceAfterScriptOpenTagStart (state, tokens) {
  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: attributesContextFactory({
      tagName: 'script'
    })
  })

  return { updatedState, updatedTokens }
}

function handleWhitespaceAfterOpenTagStart (state, tokens) {
  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: attributesContextFactory({
      tagName: undefined
    })
  })

  return { updatedState, updatedTokens }
}

const syntaxHandlers = {
  tagEnd (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens
    let switchResult

    const tagName = parseOpenTagName(state.accumulatedContent)

    switch (tagName) {
      case 'script': {
        switchResult = handleTagEndAfterScriptOpenTagStart(state, tokens)
        break
      }

      default: {
        switchResult = handleTagEndAfterOpenTagStart(state, tokens)
      }
    }

    updatedState = switchResult.updatedState
    updatedTokens = switchResult.updatedTokens

    return { updatedState, updatedTokens }
  },


  whitespace (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens
    let switchResult

    const tagName = parseOpenTagName(state.accumulatedContent)

    switch (tagName) {
      case 'script': {
        switchResult = handleWhitespaceAfterScriptOpenTagStart(
          state,
          tokens
        )
        break
      }

      default: {
        switchResult = handleWhitespaceAfterOpenTagStart(
          state,
          tokens
        )
      }
    }

    updatedState = switchResult.updatedState
    updatedTokens = switchResult.updatedTokens

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers) {
  if (chars === '>' || chars === '/') {
    return syntaxHandlers.tagEnd
  }

  if (isWhitespace(chars)) {
    return syntaxHandlers.whitespace
  }
}

module.exports = function openTagStartContextFactory () {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
