let { update, addToken } = require('../helpers')
const {
  TOKENIZER_CONTEXT_DATA
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_OPEN_TAG_END
} = require('../constants/token-types')

let syntaxHandlers = {
  closingCornerBrace (state, tokens) {
    let updatedState = state
    let updatedTokens = tokens

    updatedTokens = addToken(tokens, {
      type: TOKEN_OPEN_TAG_END,
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
