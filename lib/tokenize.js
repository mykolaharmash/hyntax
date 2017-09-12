const dataContextFactory = require('./tokenize-contexts/data.factory')

const { SYMBOL_CONTENT_END } = require('./constants/symbols')

function handleSyntaxForChar (context, state, tokens) {
  const syntaxHandler = context.parseSyntax(state.decisionBuffer)

  if (syntaxHandler) {
    return syntaxHandler(state, tokens)
  }

  return undefined
}

function handleContentEnd (context, state, tokens) {
  if (context.handleContentEnd) {
    return context.handleContentEnd(state, tokens)
  }

  return undefined
}


function tokenizeChars (chars, state, tokens) {
  let updatedState = Object.assign({}, state)
  let updatedTokens = tokens

  while (updatedState.caretPosition < chars.length) {
    const char = chars[updatedState.caretPosition]
    let currentContext = updatedState.currentContext

    if (char === SYMBOL_CONTENT_END) {
      let handlerResult = handleContentEnd(
        currentContext,
        updatedState,
        tokens
      )

      if (handlerResult !== undefined) {
        updatedState = handlerResult.updatedState
        updatedTokens = handlerResult.updatedTokens
      }

      break
    } else {
      updatedState.decisionBuffer += char

      let handlerResult = handleSyntaxForChar(
        currentContext,
        updatedState,
        tokens
      )

      if (handlerResult === undefined) {
        updatedState.accumulatedContent += updatedState.decisionBuffer
        updatedState.decisionBuffer = ''
      } else {
        updatedState = handlerResult.updatedState
        updatedTokens = handlerResult.updatedTokens
      }

      updatedState.caretPosition++
    }
  }

  return { updatedState, updatedTokens }
}

module.exports = function tokenize (
  content = '',
  existingState,
  { isFinalChunk } = { isFinalChunk: true }
) {
  const chars = [...content]

  if (isFinalChunk) {
    chars.push(SYMBOL_CONTENT_END)
  }

  const state = existingState || {
    currentContext: dataContextFactory(),
    decisionBuffer: '',
    accumulatedContent: '',
    caretPosition: 0
  }
  const tokens = []

  const result = tokenizeChars(chars, state, tokens)

  return {
    state: result.updatedState,
    tokens: result.updatedTokens
  }
}
