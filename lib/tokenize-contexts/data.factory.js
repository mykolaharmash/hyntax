const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_TEXT
} = require('../constants/token-types')
const {
  DATA_CONTEXT,
  OPEN_TAG_START_CONTEXT,
  CLOSE_TAG_CONTEXT,
  DOCTYPE_START_CONTEXT,
  COMMENT_START_CONTEXT
} = require('../constants/tokenizer-contexts')

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
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  openingCornerBraceWithText (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const openTagStartContext = contextFactories[OPEN_TAG_START_CONTEXT](
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
    const closeTagContext = contextFactories[CLOSE_TAG_CONTEXT](
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
  },

  doctypeStart (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const doctypeStartContext = contextFactories[DOCTYPE_START_CONTEXT](
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
      currentContext: doctypeStartContext
    })

    return { updatedState, updatedTokens }
  },

  commentStart (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const commentStartContext = contextFactories[COMMENT_START_CONTEXT](
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
      currentContext: commentStartContext
    })

    return { updatedState, updatedTokens }
  }
}

function handleDataContextContentEnd (state, tokens) {
  let updatedTokens = tokens
  const textContent = `${ state.accumulatedContent }${ state.decisionBuffer }`

  if (textContent.length !== 0) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_TEXT,
      content: textContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }

  return { updatedState: state, updatedTokens }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const INCOMPLETE_DOCTYPE_START = /<!\w*$/

  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
    || INCOMPLETE_DOCTYPE_START.test(chars)
  ) {
    return (state, tokens) => syntaxHandlers.undecided(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '<!--') {
    return (state, tokens) => syntaxHandlers.commentStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const COMPLETE_DOCTYPE_START = /<!DOCTYPE/i

  if (COMPLETE_DOCTYPE_START.test(chars)) {
    return (state, tokens) => syntaxHandlers.doctypeStart(
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
    factoryName: DATA_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    ),
    handleContentEnd: handleDataContextContentEnd
  }
}
