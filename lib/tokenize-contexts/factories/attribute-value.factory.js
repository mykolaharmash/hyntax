/**
 * @typedef {Object} AttributeValueContextFactoryOptions
 * @property switchToOnQuotationMark
 * @property switchToOnApostrophe
 * @property switchToOnBare
 * @property switchToOnTagEnd
 */

let { update } = require('../../helpers')

/**
 * @param {AttributeValueContextFactoryOptions} options
 */
function generateSyntaxHandlers (options) {
  return {
    quotationMark (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnQuotationMark
      })

      return { updatedState, updatedTokens: tokens }
    },

    apostrophe (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnApostrophe
      })

      return { updatedState, updatedTokens: tokens }
    },

    bare (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnBare
      })

      return { updatedState, updatedTokens: tokens }
    },

    tagEnd (state, tokens) {
      let updatedState = update(state, {
        accumulatedContent: '',
        caretPosition: state.caretPosition - state.decisionBuffer.length,
        decisionBuffer: '',
        currentContextType: options.switchToOnTagEnd
      })

      return { updatedState, updatedTokens: tokens }
    }
  }
}


function parseSyntax (chars, syntaxHandlers) {
  if (chars === '"') {
    return syntaxHandlers.quotationMark
  }

  if (chars === '\'') {
    return syntaxHandlers.apostrophe
  }

  if (chars === '>' || chars === '/') {
    return syntaxHandlers.tagEnd
  }

  const BARE_VALUE_PATTERN = /\S/

  if (BARE_VALUE_PATTERN.test(chars)) {
    return syntaxHandlers.bare
  }
}

/**
 * @param {AttributeValueContextFactoryOptions} options
 */
function validateOptions (options) {
  if (!options.switchToOnQuotationMark) {
    throw new Error(
      'switchToOnQuotationMark option was not specified for ' +
      'attributeValueContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context handles quotation mark (") symbol.'
    )
  }

  if (!options.switchToOnApostrophe) {
    throw new Error(
      'switchToOnApostrophe option was not specified for ' +
      'attributeValueContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context handles apostrophe (\') symbol.'
    )
  }

  if (!options.switchToOnBare) {
    throw new Error(
      'switchToOnBare option was not specified for ' +
      'attributeValueContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context finds bare attribute value start.'
    )
  }

  if (!options.switchToOnTagEnd) {
    throw new Error(
      'switchToOnTagEnd option was not specified for ' +
      'attributeValueContext factory.\n' +
      'The option specifies type of context to switch into when ' +
      'context reaches end of a tag.'
    )
  }
}

/**
 * @param {AttributeValueContextFactoryOptions} options
 */
module.exports = function attributeValueContextFactory (options) {
  validateOptions(options)

  const syntaxHandlers = generateSyntaxHandlers(options)

  return {
    parseSyntax: (chars) => parseSyntax(chars, syntaxHandlers)
  }
}
