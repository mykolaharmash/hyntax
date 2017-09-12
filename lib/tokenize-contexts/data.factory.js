const { update, addToken } = require('../helpers')

const calculateTokenCharactersRange = require('../helpers').calculateTokenCharactersRange

const closeTagContextFactory = require('./close-tag.factory')
const openTagStartContextFactory = require('./open-tag-start.factory')

const {
  TOKEN_TEXT
} = require('../constants/token-types')

const closeTagContext = closeTagContextFactory({
  withinContent: 'data'
})
const openTagStartContext = openTagStartContextFactory()

function generateTextToken (state) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  return {
    type: TOKEN_TEXT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  }
}

const syntaxHandlers = {
  openingCornerBrace (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  openingCornerBraceWithText (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    if (state.accumulatedContent.length !== 0) {
      const token = generateTextToken(state)

      updatedTokens = addToken(tokens, token)
    }

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: openTagStartContext
    })

    return { updatedState, updatedTokens }
  },

  openingCornerBraceWithSlash (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    if (state.accumulatedContent.length !== 0) {
      const token = generateTextToken(state)

      updatedTokens = addToken(tokens, token)
    }

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: closeTagContext
    })

    return { updatedState, updatedTokens }
  }
}

function handleDataContextContentEnd (state, tokens) {
  let updatedState = state
  let updatedTokens = tokens
  const textContent = `${ state.accumulatedContent }${ state.decisionBuffer }`

  if (textContent.length !== 0) {
    // Move the caret back as at this point
    // we are standing on SYMBOL_END_CONTENT
    // and it should not be taken into account
    // when calculating characters range
    updatedState = update(state, { caretPosition: state.caretPosition - 1 })

    const range = calculateTokenCharactersRange(updatedState, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_TEXT,
      content: textContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }

  return { updatedState, updatedTokens }
}

function parseSyntax (chars) {
  if (chars === '<') {
    return syntaxHandlers.openingCornerBrace
  }

  const OPEN_TAG_START_PATTERN = /^<\w/

  if (OPEN_TAG_START_PATTERN.test(chars)) {
    return syntaxHandlers.openingCornerBraceWithText
  }

  if (chars === '</') {
    return syntaxHandlers.openingCornerBraceWithSlash
  }
}

module.exports = function dataContextFactory () {
  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers),
    handleContentEnd: handleDataContextContentEnd
  }
}
