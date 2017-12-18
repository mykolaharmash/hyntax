const {
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
  OPEN_TAG_START_CONTEXT,
  OPEN_TAG_END_CONTEXT,
  ATTRIBUTES_CONTEXT
} = require('../constants/tokenizer-contexts')

function handleTagEndAfterScriptOpenTagStart (
  state,
  tokens,
  contextFactories
) {
  const openTagEndContext = contextFactories[OPEN_TAG_END_CONTEXT](
    contextFactories,
    { tagName: 'script' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = openTagEndContext
}

function handleTagEndAfterStyleOpenTagStart (
  state,
  tokens,
  contextFactories
) {
  const openTagEndContext = contextFactories[OPEN_TAG_END_CONTEXT](
    contextFactories,
    { tagName: 'style' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = openTagEndContext
}

function handleTagEndAfterOpenTagStart (
  state,
  tokens,
  contextFactories
) {
  const openTagEndContext = contextFactories[OPEN_TAG_END_CONTEXT](
    contextFactories,
    { tagName: undefined }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = openTagEndContext
}

function handleWhitespaceAfterScriptOpenTagStart (
  state,
  tokens,
  contextFactories
) {
  const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
    contextFactories,
    { tagName: 'script' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = attributesContext
}

function handleWhitespaceAfterStyleOpenTagStart (
  state,
  tokens,
  contextFactories
) {
  const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
    contextFactories,
    { tagName: 'style' }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = attributesContext
}

function handleWhitespaceAfterOpenTagStart (
  state,
  tokens,
  contextFactories
) {
  const attributesContext = contextFactories[ATTRIBUTES_CONTEXT](
    contextFactories,
    { tagName: undefined }
  )
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_OPEN_TAG_START,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.caretPosition -= state.decisionBuffer.length
  state.decisionBuffer = ''
  state.currentContext = attributesContext
}

const syntaxHandlers = {
  tagEnd (state, tokens, contextFactories, options) {
    const tagName = parseOpenTagName(state.accumulatedContent)

    switch (tagName) {
      case 'script': {
        handleTagEndAfterScriptOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      case 'style': {
        handleTagEndAfterStyleOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      default: {
        handleTagEndAfterOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
      }
    }
  },

  whitespace (state, tokens, contextFactories, options) {
    const tagName = parseOpenTagName(state.accumulatedContent)

    switch (tagName) {
      case 'script': {
        handleWhitespaceAfterScriptOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      case 'style': {
        handleWhitespaceAfterStyleOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
        break
      }

      default: {
        handleWhitespaceAfterOpenTagStart(
          state,
          tokens,
          contextFactories,
          options
        )
      }
    }
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
    factoryName: OPEN_TAG_START_CONTEXT,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}
