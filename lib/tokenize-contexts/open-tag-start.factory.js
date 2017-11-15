const {
  update,
  addToken,
  parseOpenTagName,
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_START_STYLE
} = require('../constants/token-types')
const {
  OPEN_TAG_START_FACTORY,
  OPEN_TAG_END_FACTORY,
  ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

function handleTagEndAfterScriptOpenTagStart (
  state,
  tokens,
  contextFactories,
  options
) {
  const openTagEndContext = contextFactories[OPEN_TAG_END_FACTORY](
    contextFactories,
    { tagName: 'script' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: openTagEndContext
  })

  return { updatedState, updatedTokens }
}

function handleTagEndAfterStyleOpenTagStart (
  state,
  tokens,
  contextFactories,
  options
) {
  const openTagEndContext = contextFactories[OPEN_TAG_END_FACTORY](
    contextFactories,
    { tagName: 'style' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: openTagEndContext
  })

  return { updatedState, updatedTokens }
}

function handleTagEndAfterOpenTagStart (
  state,
  tokens,
  contextFactories,
  options
) {
  const openTagEndContext = contextFactories[OPEN_TAG_END_FACTORY](
    contextFactories,
    { tagName: undefined }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: openTagEndContext
  })

  return { updatedState, updatedTokens }
}

function handleWhitespaceAfterScriptOpenTagStart (
  state,
  tokens,
  contextFactories,
  options
) {
  const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
    contextFactories,
    { tagName: 'script' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: attributesContext
  })

  return { updatedState, updatedTokens }
}

function handleWhitespaceAfterStyleOpenTagStart (
  state,
  tokens,
  contextFactories,
  options
) {
  const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
    contextFactories,
    { tagName: 'style' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: attributesContext
  })

  return { updatedState, updatedTokens }
}

function handleWhitespaceAfterOpenTagStart (
  state,
  tokens,
  contextFactories,
  options
) {
  const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
    contextFactories,
    { tagName: undefined }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  const updatedTokens = addToken(tokens, {
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  const updatedState = update(state, {
    accumulatedContent: '',
    caretPosition: state.caretPosition - state.decisionBuffer.length,
    decisionBuffer: '',
    currentContext: attributesContext
  })

  return { updatedState, updatedTokens }
}

const syntaxHandlers = {
  tagEnd (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    let switchResult

    const tagName = parseOpenTagName(state.accumulatedContent)

    switch (tagName) {
      case 'script': {
        switchResult = handleTagEndAfterScriptOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      case 'style': {
        switchResult = handleTagEndAfterStyleOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      default: {
        switchResult = handleTagEndAfterOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
      }
    }

    updatedState = switchResult.updatedState
    updatedTokens = switchResult.updatedTokens

    return { updatedState, updatedTokens }
  },

  whitespace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    let switchResult

    const tagName = parseOpenTagName(state.accumulatedContent)

    switch (tagName) {
      case 'script': {
        switchResult = handleWhitespaceAfterScriptOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      case 'style': {
        switchResult = handleWhitespaceAfterStyleOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      default: {
        switchResult = handleWhitespaceAfterOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
      }
    }

    updatedState = switchResult.updatedState
    updatedTokens = switchResult.updatedTokens

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (isWhitespace(chars)) {
    return (state, tokens) => syntaxHandlers.whitespace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function openTagStartContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: OPEN_TAG_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
