const { update, addToken } = require('../helpers')

const calculateTokenCharactersRange = require('../helpers').calculateTokenCharactersRange

const {
  TOKEN_TEXT
} = require('../constants/token-types')
const {
  OPEN_TAG_START_FACTORY,
  CLOSE_TAG_FACTORY
} = require('../constants/tokenizer-context-factories')

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

  openingCornerBraceWithText (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const openTagStartContext = contextFactories[OPEN_TAG_START_FACTORY](
      contextFactories
    )

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

  openingCornerBraceWithSlash (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const closeTagContext = contextFactories[CLOSE_TAG_FACTORY](
      contextFactories,
      { withinContent: 'data' }
    )

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

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '<') {
    return (state, tokens) => syntaxHandlers.openingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const OPEN_TAG_START_PATTERN = /^<\w/

  if (OPEN_TAG_START_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.openingCornerBraceWithText(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '</') {
    return (state, tokens) => syntaxHandlers.openingCornerBraceWithSlash(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function dataContextFactory (contextFactories, options) {
  return {
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    ),
    handleContentEnd: handleDataContextContentEnd
  }
}
