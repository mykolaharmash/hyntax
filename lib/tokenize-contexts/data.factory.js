const { calculateTokenCharactersRange } = require('../helpers')

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
  openingCornerBraceWithText (state, tokens, contextFactories) {
    const openTagStartContext = contextFactories[OPEN_TAG_START_CONTEXT](
      contextFactories
    )

    if (state.accumulatedContent.length !== 0) {
      tokens.push(generateTextToken(state))
    }

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = openTagStartContext
  },

  openingCornerBraceWithSlash (state, tokens, contextFactories) {
    const closeTagContext = contextFactories[CLOSE_TAG_CONTEXT](
      contextFactories,
      { withinContent: 'data' }
    )

    if (state.accumulatedContent.length !== 0) {
      tokens.push(generateTextToken(state))
    }

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = closeTagContext
  },

  doctypeStart (state, tokens, contextFactories) {
    const doctypeStartContext = contextFactories[DOCTYPE_START_CONTEXT](
      contextFactories
    )

    if (state.accumulatedContent.length !== 0) {
      tokens.push(generateTextToken(state))
    }

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = doctypeStartContext
  },

  commentStart (state, tokens, contextFactories) {
    const commentStartContext = contextFactories[COMMENT_START_CONTEXT](
      contextFactories
    )

    if (state.accumulatedContent.length !== 0) {
      tokens.push(generateTextToken(state))
    }

    state.accumulatedContent = ''
    state.caretPosition -= state.decisionBuffer.length
    state.decisionBuffer = ''
    state.currentContext = commentStartContext
  }
}

function handleDataContextContentEnd (state, tokens) {
  const textContent = `${ state.accumulatedContent }${ state.decisionBuffer }`

  if (textContent.length !== 0) {
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    tokens.push({
      type: TOKEN_TEXT,
      content: textContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }
}

const INCOMPLETE_DOCTYPE_START = /<!\w*$/
const COMPLETE_DOCTYPE_START = /<!DOCTYPE/i
const OPEN_TAG_START_PATTERN = /^<\w/

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
    || INCOMPLETE_DOCTYPE_START.test(chars)
  ) {
    /**
     * Signals to wait for more characters in
     * the decision buffer to decide about syntax
     */
    return () => {}
  }

  if (chars === '<!--') {
    return (state, tokens) => syntaxHandlers.commentStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (COMPLETE_DOCTYPE_START.test(chars)) {
    return (state, tokens) => syntaxHandlers.doctypeStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }

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
