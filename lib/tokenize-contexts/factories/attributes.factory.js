/**
 * @typedef {Object} AttributesContextFactoryOptions
 * @property switchToOnOpenTagEnd
 * @property switchToOnNoneWhitespace
 * @property switchToOnEqual
 */

let { update } = require('../../helpers')

/**
 * @param {AttributesContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    tagEnd (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnOpenTagEnd
      })

      return { updatedState, updatedTokens: tokens }
    },

    noneWhitespace (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnNoneWhitespace
      })

      return { updatedState, updatedTokens: tokens }
    },

    equal (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnEqual
      })

      return { updatedState, updatedTokens: tokens }
    }
  }
}

function parseSyntax (chars, syntaxHandlers) {
  if (chars === '>' || chars === '/') {
    return syntaxHandlers.tagEnd
  }

  if (chars === '=') {
    return syntaxHandlers.equal
  }

  const ATTRIBUTE_KEY_PATTERN = /^\S/

  if (ATTRIBUTE_KEY_PATTERN.test(chars)) {
    return syntaxHandlers.noneWhitespace
  }
}

/**
 * @param {AttributesContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnOpenTagEnd) {
    throw new Error(
      'switchToOnOpenTagEnd option was not specified for attributesContext ' +
      'factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context handles open tag end syntax.'
    )
  }

  if (!options.switchToOnNoneWhitespace) {
    throw new Error(
      'switchToOnNoneWhitespace option was not specified for ' +
      'attributesContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context handles first none whitespace character of an attribute.'
    )
  }

  if (!options.switchToOnEqual) {
    throw new Error(
      'switchToOnEqual option was not specified for ' +
      'attributesContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context handles equal symbol.'
    )
  }
}

/**
 * @param {AttributesContextFactoryOptions} options
 */
module.exports = function attributesContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
