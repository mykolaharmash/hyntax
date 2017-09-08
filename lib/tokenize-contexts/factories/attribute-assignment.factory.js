/**
 * @typedef {Object} AttributeAssignmentContextFactoryOptions
 * @property {String} switchToOnEqual
 */

let { addToken, update } = require('../../helpers')
const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../../constants/token-types')

/**
 * @param {AttributeAssignmentContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    equal (state, tokens) {
      let updatedState = state
      let updatedTokens = tokens

      updatedTokens = addToken(tokens, {
        type: TOKEN_ATTRIBUTE_ASSIGNMENT,
        content: `${ state.accumulatedContent }${ state.decisionBuffer }`
      })

      updatedState = update(state, {
        accumulatedContent: '',
        decisionBuffer: '',
        currentContextType: options.switchToOnEqual
      })

      return { updatedState, updatedTokens }
    },
  }
}

function parseSyntax (chars, syntaxHandlers) {
  if (chars === '=') {
    return syntaxHandlers.equal
  }
}

/**
 * @param {AttributeAssignmentContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnEqual) {
    throw new Error(
      'switchToOnEqual option was not specified for ' +
      'attributeAssignmentContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'current context handles equal (=) symbol.'
    )
  }
}

/**
 * @param {AttributeAssignmentContextFactoryOptions} options
 */
module.exports = function attributeKeyContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
