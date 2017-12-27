const { calculateTokenCharactersRange } = require('../helpers')

const { TOKEN_ATTRIBUTE_KEY } = require('../constants/token-types')
const { ATTRIBUTES_CONTEXT } = require('../constants/tokenizer-contexts')

function keyEnd (state, tokens) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  tokens.push({
    type: TOKEN_ATTRIBUTE_KEY,
    content: state.accumulatedContent,
    startPosition: range.startPosition,
    endPosition: range.endPosition
  })

  state.accumulatedContent = ''
  state.decisionBuffer = ''
  state.currentContext = ATTRIBUTES_CONTEXT
}

function isKeyBreak (chars) {
  return (
    chars === '='
    || chars === ' '
    || chars === '\n'
    || chars === '\t'
    || chars === '/'
    || chars === '>'
  )
}

function parseSyntax (chars, state, tokens) {
  if (isKeyBreak(chars)) {
    return keyEnd(state, tokens)
  }

  state.accumulatedContent += state.decisionBuffer
  state.decisionBuffer = ''
  state.caretPosition++
}

module.exports = {
  parseSyntax
}
