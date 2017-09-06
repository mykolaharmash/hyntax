let { addToken, update } = require('../helpers')
const {
  TOKENIZER_CONTEXT_DATA
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_CLOSE_TAG
} = require('../constants/token-types')


let syntaxHandlers = {
  closingCornerBrace (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_CLOSE_TAG,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContextType: TOKENIZER_CONTEXT_DATA
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars) {
  if (chars === '>') {
    return syntaxHandlers.closingCornerBrace
  }
}

module.exports = {
  syntaxHandlers,
  parseSyntax
}
