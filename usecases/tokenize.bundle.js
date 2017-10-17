(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  TAG_CONTENT_CONTEXT: 'parser-context:tag-content',
  TAG_CONTEXT: 'parser-context:tag',
  TAG_NAME_CONTEXT: 'parser-context:tag-name',
  ATTRIBUTES_CONTEXT: 'parser-context:attributes',
  ATTRIBUTE_CONTEXT: 'parser-context:attribute',
  ATTRIBUTE_VALUE_CONTEXT: 'parser-context:attribute-value',
  COMMENT_CONTEXT: 'parser-context:comment',
  DOCTYPE_CONTEXT: 'parser-context:doctype',
  DOCTYPE_ATTRIBUTES_CONTEXT: 'parser-context:doctype-attributes'
}

},{}],2:[function(require,module,exports){
module.exports = {
  TOKEN_TEXT: 'token:text',
  TOKEN_OPEN_TAG_START: 'token:open-tag-start',
  TOKEN_ATTRIBUTE_KEY: 'token:attribute-key',
  TOKEN_ATTRIBUTE_ASSIGNMENT: 'token:attribute-assignment',
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START: 'token:attribute-value-wrapper-start',
  TOKEN_ATTRIBUTE_VALUE: 'token:attribute-value',
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END: 'token:attribute-value-wrapper-end',
  TOKEN_OPEN_TAG_END: 'token:open-tag-end',
  TOKEN_CLOSE_TAG: 'token:close-tag',
  TOKEN_OPEN_TAG_START_SCRIPT: 'token:open-tag-start-script',
  TOKEN_SCRIPT_TAG_CONTENT: 'token:script-tag-content',
  TOKEN_OPEN_TAG_END_SCRIPT: 'token:open-tag-end-script',
  TOKEN_CLOSE_TAG_SCRIPT: 'token:close-tag-script',
  TOKEN_DOCTYPE_START: 'token:doctype-start',
  TOKEN_DOCTYPE_END: 'token:doctype-end',
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START: 'token:doctype-attribute-wrapper-start',
  TOKEN_DOCTYPE_ATTRIBUTE: 'token:doctype-attribute',
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END: 'token:doctype-attribute-wrapper-end',
  TOKEN_COMMENT_START: 'token:comment-start',
  TOKEN_COMMENT_CONTENT: 'token:comment-content',
  TOKEN_COMMENT_END: 'token:comment-end'
}


},{}],3:[function(require,module,exports){
module.exports = {
  DATA_FACTORY: 'context-factory:data',
  OPEN_TAG_START_FACTORY: 'context-factory:open-tag-start',
  CLOSE_TAG_FACTORY: 'context-factory:close-tag',
  ATTRIBUTES_FACTORY: 'context-factory:attributes',
  OPEN_TAG_END_FACTORY: 'context-factory:open-tag-end',
  ATTRIBUTE_ASSIGNMENT_FACTORY: 'context-factory:attribute-assignment',
  ATTRIBUTE_KEY_FACTORY: 'context-factory:attribute-key',
  ATTRIBUTE_VALUE_FACTORY: 'context-factory:attribute-value',
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY: 'context-factory:attribute-value-wrapped-start',
  ATTRIBUTE_VALUE_BARE_FACTORY: 'context-factory:attribute-value-bare',
  ATTRIBUTE_VALUE_WRAPPED_FACTORY: 'context-factory:attribute-value-wrapped',
  ATTRIBUTE_VALUE_WRAPPED_END_FACTORY: 'context-factory:attribute-value-wrapped-end',
  SCRIPT_CONTENT_FACTORY: 'context-factory:script-content',
  DOCTYPE_START_FACTORY: 'context-factory:doctype-start',
  DOCTYPE_END_FACTORY: 'context-factory:doctype-end',
  DOCTYPE_ATTRIBUTES_FACTORY: 'context-factory:doctype-attributes',
  DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY: 'context-factory:doctype-attribute-wrapped-start',
  DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY: 'context-factory:doctype-attribute-wrapped',
  DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY: 'context-factory:doctype-attribute-wrapped-end',
  DOCTYPE_ATTRIBUTE_BARE_FACTORY: 'context-factory:doctype-attribute-bare',
  COMMENT_START_FACTORY: 'context-factory:comment-start',
  COMMENT_CONTENT_FACTORY: 'context-factory:comment-content',
  COMMENT_END_FACTORY: 'context-factory:comment-end'
}

},{}],4:[function(require,module,exports){
const parserContexts = require('../lib/constants/parser-contexts')

const parserContextTypes = Object.keys(parserContexts)
  .map((key) => parserContexts[key])

/**
 * Function might be used to make state
 * immutable, as users of this method
 * always save the reference returned
 * by the function, so it can be new object
 * every time.
 * Immutability should be enabled only for
 * debugging, as it causes performance
 * decrease.
 */
function update (state, updates) {
  if (!state || !updates) {
    throw new Error(
      'Wrong number of arguments provided for update.\n' +
      'It should be update(state, updates).'
    )
  }

  return Object.assign(state, updates)
}

/**
 * Function might be used to make tokens
 * array immutable and return avery time
 * new array. Users of this function always
 * save the reference, returned by the function,
 * so it can be new array every time.
 * Immutable tokens array should be used
 * only for debugging, as in production
 * it will cause significant performance
 * decrease.
 */
function addToken (tokens, token) {
  tokens.push(token)

  return tokens
}

function prettyJSON (obj) {
  return JSON.stringify(obj, null, 2)
}

/**
 * Clear contexts tree from everything
 * except "type" and "content".
 * Drops properties like "parentRef",
 * so the tree can be easily stringified
 * into JSON.
 */
function clearContext (context) {
  let cleanContext

  // If context is not one of the parser contexts
  // then it's a token, tokens should be saved
  // untouched
  if (parserContextTypes.includes(context.type)) {
    cleanContext = {
      type: context.type
    }
  } else {
    cleanContext = context
  }


  if (Array.isArray(context.content)) {
    cleanContext.content = context.content.map((childContext) => {
      return clearContext(childContext)
    })
  } else {
    cleanContext.content = context.content
  }

  return cleanContext
}

function parseOpenTagName (openTagStartTokenContent) {
  const PATTERN = /^<(\S+)/

  let match = openTagStartTokenContent.match(PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse open tag name.\n' +
      `${ openTagStartTokenContent } does not match pattern of opening tag.`
    )
  }

  return match[1]
}

function parseCloseTagName (closeTagTokenContent) {
  const PATTERN = /^<\/(.+)>$/

  let match = closeTagTokenContent.match(PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse close tag name.\n' +
      `${ closeTagTokenContent } does not match pattern of closing tag.`
    )
  }

  return match[1].trim()
}

function calculateTokenCharactersRange (state, { keepBuffer }) {
  if (keepBuffer === undefined) {
    throw new Error(
      'Unable to calculate characters range for token.\n' +
      '"keepBuffer" parameter is not specified to decide if ' +
      'the decision buffer is a part of characters range.'
    )
  }

  const startPosition = (
    state.caretPosition -
    (state.accumulatedContent.length - 1) -
    state.decisionBuffer.length
  )

  let endPosition

  if (!keepBuffer) {
    endPosition = state.caretPosition - state.decisionBuffer.length
  } else {
    endPosition = state.caretPosition
  }

  return { startPosition, endPosition }
}

function isWhitespace (char) {
  return (
    char === ' ' ||
    char === '\n' ||
    char === '\t'
  )
}

module.exports = {
  prettyJSON,
  clearContext,
  parseOpenTagName,
  parseCloseTagName,
  calculateTokenCharactersRange,
  update,
  addToken,
  isWhitespace
}

},{"../lib/constants/parser-contexts":1}],5:[function(require,module,exports){
let {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_ASSIGNMENT
} = require('../constants/token-types')
const {
  ATTRIBUTE_ASSIGNMENT_FACTORY,
  ATTRIBUTE_VALUE_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  equal (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributeValueContext = contextFactories[ATTRIBUTE_VALUE_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributeValueContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '=') {
    return (state, tokens) => syntaxHandlers.equal(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeKeyContextFactory (contextFactories, options) {
  return {
    factoryName: ATTRIBUTE_ASSIGNMENT_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],6:[function(require,module,exports){
const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const { TOKEN_ATTRIBUTE_KEY } = require('../constants/token-types')
const {
  ATTRIBUTE_KEY_FACTORY,
  ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  keyEnd (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_KEY,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const KEY_BREAK_CHARS = [' ', '\n', '\t', '=', '/', '>']

  if (KEY_BREAK_CHARS.includes(chars)) {
    return (state, tokens) => syntaxHandlers.keyEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeKeyContextFactory (contextFactories, options) {
  return {
    factoryName: ATTRIBUTE_KEY_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],7:[function(require,module,exports){
const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_BARE_FACTORY,
  ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  valueEnd (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const BARE_VALUE_END_PATTERN = /\s/

  if (
    BARE_VALUE_END_PATTERN.test(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return (state, tokens) => syntaxHandlers.valueEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueBareContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_BARE_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],8:[function(require,module,exports){
const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_END_FACTORY,
  ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens }
  }
}


function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueWrappedEndContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_WRAPPED_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],9:[function(require,module,exports){
let {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributeValueWrappedContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributeValueWrappedContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueWrappedStartContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],10:[function(require,module,exports){
const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributeValueWrappedEndContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_END_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueWrappedEndContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueWrappedContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_WRAPPED_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],11:[function(require,module,exports){
let { update } = require('../helpers')

const {
  ATTRIBUTE_VALUE_FACTORY,
  ATTRIBUTES_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
  ATTRIBUTE_VALUE_BARE_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    const attributeValueWrappedStartContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_START_FACTORY](
      contextFactories,
      Object.assign({}, options, { wrapper: state.decisionBuffer })
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueWrappedStartContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  bare (state, tokens, contextFactories, options) {
    const attributeValueBareContext = contextFactories[ATTRIBUTE_VALUE_BARE_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeValueBareContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  tagEnd (state, tokens, contextFactories, options) {
    const attributesContext = contextFactories[ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens: tokens }
  }
}


function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '"' || chars === '\'') {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '>' || chars === '/') {
    return (state, tokens) => syntaxHandlers.tagEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const BARE_VALUE_PATTERN = /\S/

  if (BARE_VALUE_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.bare(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueContextFactory (contextFactories, options) {
  return {
    factoryName: ATTRIBUTE_VALUE_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/tokenizer-context-factories":3,"../helpers":4}],12:[function(require,module,exports){
const { update } = require('../helpers')

const {
  ATTRIBUTES_FACTORY,
  OPEN_TAG_END_FACTORY,
  ATTRIBUTE_ASSIGNMENT_FACTORY,
  ATTRIBUTE_KEY_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  tagEnd (state, tokens, contextFactories, options) {
    const openTagEndContext = contextFactories[OPEN_TAG_END_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: openTagEndContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  noneWhitespace (state, tokens, contextFactories, options) {
    const attributeKeyContext = contextFactories[ATTRIBUTE_KEY_FACTORY](
      contextFactories,
      options
    )

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeKeyContext
    })

    return { updatedState, updatedTokens: tokens }
  },

  equal (state, tokens, contextFactories, options) {
    const attributeAssignmentContext = contextFactories[ATTRIBUTE_ASSIGNMENT_FACTORY](
      contextFactories,
      options
    )

    let updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributeAssignmentContext
    })

    return { updatedState, updatedTokens: tokens }
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

  if (chars === '=') {
    return (state, tokens) => syntaxHandlers.equal(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const ATTRIBUTE_KEY_PATTERN = /^\S/

  if (ATTRIBUTE_KEY_PATTERN.test(chars)) {
    return (state, tokens) => {
      return syntaxHandlers.noneWhitespace(
        state,
        tokens,
        contextFactories,
        options
      )
    }
  }
}

module.exports = function attributesContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTES_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/tokenizer-context-factories":3,"../helpers":4}],13:[function(require,module,exports){
const {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_CLOSE_TAG,
  TOKEN_CLOSE_TAG_SCRIPT
} = require('../constants/token-types')
const {
  CLOSE_TAG_FACTORY,
  DATA_FACTORY
} = require('../constants/tokenizer-context-factories')

/**
 * @param withinContent — type of content withing
 * which the close tag was found
 */
function getCloseTokenType (withinContent) {
  switch (withinContent) {
    case 'script': {
      return TOKEN_CLOSE_TAG_SCRIPT
    }
    case 'data': {
      return TOKEN_CLOSE_TAG
    }
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const tokenType = getCloseTokenType(options.withinContent)
    const dataContext = contextFactories[DATA_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: tokenType,
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: dataContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => {
      return syntaxHandlers.closingCornerBrace(
        state,
        tokens,
        contextFactories,
        options
      )
    }
  }
}

module.exports = function closeTagContextFactory (contextFactories, options) {
  return {
    factoryName: CLOSE_TAG_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],14:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_COMMENT_CONTENT
} = require('../constants/token-types')
const {
  COMMENT_CONTENT_FACTORY,
  COMMENT_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  commentEnd (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const commentContentContext = contextFactories[COMMENT_END_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_COMMENT_CONTENT,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: commentContentContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '-' || chars === '--') {
    return (state, tokens) => syntaxHandlers.undecided(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '-->') {
    return (state, tokens) => syntaxHandlers.commentEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function commentContentContextFactory (contextFactories, options) {
  return {
    factoryName: COMMENT_CONTENT_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],15:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_COMMENT_END
} = require('../constants/token-types')
const {
  COMMENT_END_FACTORY,
  DATA_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  commentEnd (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const dataContext = contextFactories[DATA_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_COMMENT_END,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: dataContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.commentEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function commentEndContextFactory (contextFactories, options) {
  return {
    factoryName: COMMENT_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],16:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_COMMENT_START
} = require('../constants/token-types')
const {
  COMMENT_START_FACTORY,
  COMMENT_CONTENT_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  commentStart (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const commentContentContext = contextFactories[COMMENT_CONTENT_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_COMMENT_START,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: commentContentContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
  ) {
    return (state, tokens) => syntaxHandlers.undecided(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '<!--') {
    return (state, tokens) => syntaxHandlers.commentStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function commentStartContextFactory (contextFactories, options) {
  return {
    factoryName: COMMENT_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],17:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_TEXT
} = require('../constants/token-types')
const {
  DATA_FACTORY,
  OPEN_TAG_START_FACTORY,
  CLOSE_TAG_FACTORY,
  DOCTYPE_START_FACTORY,
  COMMENT_START_FACTORY
} = require('../constants/tokenizer-context-factories')

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
  undecided (state, tokens) {
    return { updatedState: state, updatedTokens: tokens }
  },

  openingCornerBraceWithText (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const openTagStartContext = contextFactories[OPEN_TAG_START_FACTORY](
      contextFactories
    )

    if (state.accumulatedContent.length !== 0) {
      const token = generateTextToken(state)

      updatedTokens = addToken(tokens, token)
    }

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: openTagStartContext
    })

    return { updatedState, updatedTokens }
  },

  openingCornerBraceWithSlash (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const closeTagContext = contextFactories[CLOSE_TAG_FACTORY](
      contextFactories,
      { withinContent: 'data' }
    )

    if (state.accumulatedContent.length !== 0) {
      const token = generateTextToken(state)

      updatedTokens = addToken(tokens, token)
    }

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: closeTagContext
    })

    return { updatedState, updatedTokens }
  },

  doctypeStart (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const doctypeStartContext = contextFactories[DOCTYPE_START_FACTORY](
      contextFactories
    )

    if (state.accumulatedContent.length !== 0) {
      const token = generateTextToken(state)

      updatedTokens = addToken(tokens, token)
    }

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeStartContext
    })

    return { updatedState, updatedTokens }
  },

  commentStart (state, tokens, contextFactories) {
    let updatedState = state
    let updatedTokens = tokens
    const commentStartContext = contextFactories[COMMENT_START_FACTORY](
      contextFactories
    )

    if (state.accumulatedContent.length !== 0) {
      const token = generateTextToken(state)

      updatedTokens = addToken(tokens, token)
    }

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: commentStartContext
    })

    return { updatedState, updatedTokens }
  }
}

function handleDataContextContentEnd (state, tokens) {
  let updatedState = state
  let updatedTokens = tokens
  const textContent = `${ state.accumulatedContent }${ state.decisionBuffer }`

  if (textContent.length !== 0) {
    const range = calculateTokenCharactersRange(updatedState, { keepBuffer: false })

    updatedTokens = addToken(tokens, {
      type: TOKEN_TEXT,
      content: textContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })
  }

  return { updatedState, updatedTokens }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const INCOMPLETE_DOCTYPE_START = /<!\w*$/

  if (
    chars === '<'
    || chars === '<!'
    || chars === '<!-'
    || INCOMPLETE_DOCTYPE_START.test(chars)
  ) {
    return (state, tokens) => syntaxHandlers.undecided(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '<!--') {
    return (state, tokens) => syntaxHandlers.commentStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const COMPLETE_DOCTYPE_START = /<!DOCTYPE/i

  if (COMPLETE_DOCTYPE_START.test(chars)) {
    return (state, tokens) => syntaxHandlers.doctypeStart(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const OPEN_TAG_START_PATTERN = /^<\w/

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
    factoryName: DATA_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    ),
    handleContentEnd: handleDataContextContentEnd
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],18:[function(require,module,exports){
const {
  addToken,
  update,
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_BARE_FACTORY,
  DOCTYPE_ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  attributeEnd (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const doctypeAttributesContext = contextFactories[DOCTYPE_ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributesContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (isWhitespace(chars) || chars === '>') {
    return (state, tokens) => syntaxHandlers.attributeEnd(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributeBareContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_BARE_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],19:[function(require,module,exports){
let { addToken, update, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY,
  DOCTYPE_ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const doctypeAttributesContext = contextFactories[DOCTYPE_ATTRIBUTES_FACTORY](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: doctypeAttributesContext
    })

    return { updatedState, updatedTokens }
  }
}


function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributeWrappedEndContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],20:[function(require,module,exports){
let { addToken, update, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })
    const doctypeAttributeWrappedContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: doctypeAttributeWrappedContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributeWrappedStartContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],21:[function(require,module,exports){
let { addToken, update, calculateTokenCharactersRange } = require('../helpers')

const {
  TOKEN_DOCTYPE_ATTRIBUTE
} = require('../constants/token-types')
const {
  DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })
    const doctypeAttributeWrappedEndContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY](
      contextFactories,
      options
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_ATTRIBUTE,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributeWrappedEndContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributeWrappedContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],22:[function(require,module,exports){
const { update, isWhitespace } = require('../helpers')

const {
  DOCTYPE_ATTRIBUTES_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY,
  DOCTYPE_ATTRIBUTE_BARE_FACTORY,
  DOCTYPE_END_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const doctypeAttributeWrappedStartContext = contextFactories[DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY](
      contextFactories,
      { wrapper: state.decisionBuffer }
    )

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributeWrappedStartContext
    })

    return { updatedState, updatedTokens }
  },

  bare (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens

    const doctypeAttributeBareStartContext = contextFactories[DOCTYPE_ATTRIBUTE_BARE_FACTORY](
      contextFactories
    )

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeAttributeBareStartContext
    })

    return { updatedState, updatedTokens }
  },

  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens

    const doctypeEndContext = contextFactories[DOCTYPE_END_FACTORY](
      contextFactories
    )

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeEndContext
    })

    return { updatedState, updatedTokens }
  },
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '"' || chars === '\'') {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (!isWhitespace(chars)) {
    return (state, tokens) => syntaxHandlers.bare(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeAttributesContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: DOCTYPE_ATTRIBUTES_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/tokenizer-context-factories":3,"../helpers":4}],23:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_DOCTYPE_END
} = require('../constants/token-types')

const {
  DOCTYPE_END_FACTORY,
  DATA_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  closingCornerBrace(state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    const dataContext = contextFactories[DATA_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, {
      type: TOKEN_DOCTYPE_END,
      content: state.accumulatedContent + state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: dataContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeEndContextFactory (contextFactories, options) {
  return {
    factoryName: DOCTYPE_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],24:[function(require,module,exports){
const {
  update,
  addToken,
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_DOCTYPE_START
} = require('../constants/token-types')

const {
  DOCTYPE_START_FACTORY,
  DOCTYPE_END_FACTORY,
  DOCTYPE_ATTRIBUTES_FACTORY
} = require('../constants/tokenizer-context-factories')

function generateDoctypeStartToken (state) {
  const range = calculateTokenCharactersRange(state, { keepBuffer: false })

  return {
      type: TOKEN_DOCTYPE_START,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens

    const doctypeEndContext = contextFactories[DOCTYPE_END_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, generateDoctypeStartToken(state))

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: doctypeEndContext
    })

    return { updatedState, updatedTokens }
  },

  whitespace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributesContext = contextFactories[DOCTYPE_ATTRIBUTES_FACTORY](
      contextFactories
    )

    updatedTokens = addToken(tokens, generateDoctypeStartToken(state))

    updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: attributesContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (isWhitespace(chars)) {
    return (state, tokens) => syntaxHandlers.whitespace(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function doctypeStartContextFactory (contextFactories, options) {
  return {
    factoryName: DOCTYPE_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],25:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_OPEN_TAG_END,
  TOKEN_OPEN_TAG_END_SCRIPT
} = require('../constants/token-types')
const {
  OPEN_TAG_END_FACTORY,
  DATA_FACTORY,
  SCRIPT_CONTENT_FACTORY
} = require('../constants/tokenizer-context-factories')

function getTokenType (tagName) {
  switch (tagName) {
    case 'script': {
      return TOKEN_OPEN_TAG_END_SCRIPT
    }

    default: {
      return TOKEN_OPEN_TAG_END
    }
  }
}

function getContentContext (tagName, contextFactories, options) {
  const scriptContentContext = contextFactories[SCRIPT_CONTENT_FACTORY](
    contextFactories,
    options
  )
  const dataContext = contextFactories[DATA_FACTORY](
    contextFactories,
    options
  )

  switch (tagName) {
    case 'script': {
      return scriptContentContext
    }

    default: {
      return dataContext
    }
  }
}

const syntaxHandlers = {
  closingCornerBrace (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: getTokenType(options.tagName),
      content: `${ state.accumulatedContent }${ state.decisionBuffer }`,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: getContentContext(
        options.tagName,
        contextFactories,
        options
      )
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === '>') {
    return (state, tokens) => syntaxHandlers.closingCornerBrace(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function openTagEndContextFactory (contextFactories, options) {
  return {
    factoryName: OPEN_TAG_END_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],26:[function(require,module,exports){
const {
  update,
  addToken,
  parseOpenTagName,
  isWhitespace,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_START_SCRIPT
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

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],27:[function(require,module,exports){
const {
  update,
  addToken,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_SCRIPT_TAG_CONTENT,
} = require('../constants/token-types')
const {
  SCRIPT_CONTENT_FACTORY,
  CLOSE_TAG_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  incompleteClosingTag (state, tokens, contextFactories, options) {
    return { updatedState: state, updatedTokens: tokens }
  },

  closingScriptTag (state, tokens, contextFactories, options) {
    const closeTagContext = contextFactories[CLOSE_TAG_FACTORY](
      contextFactories,
      { withinContent: 'script' }
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: false })

    const updatedTokens = addToken(tokens, {
      type: TOKEN_SCRIPT_TAG_CONTENT,
      content: state.accumulatedContent,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    const updatedState = update(state, {
      accumulatedContent: '',
      caretPosition: state.caretPosition - state.decisionBuffer.length,
      decisionBuffer: '',
      currentContext: closeTagContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  const INCOMPLETE_CLOSING_TAG_PATTERN = /<\/[^>]+$/

  if (
    chars === '<' ||
    chars === '</' ||
    INCOMPLETE_CLOSING_TAG_PATTERN.test(chars)
  ) {
    return (state, tokens) => syntaxHandlers.incompleteClosingTag(
      state,
      tokens,
      contextFactories,
      options
    )
  }

  const CLOSING_SCRIPT_TAG_PATTERN = /<\/script\s*>/

  if (CLOSING_SCRIPT_TAG_PATTERN.test(chars)) {
    return (state, tokens) => syntaxHandlers.closingScriptTag(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function scriptTagContentContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: SCRIPT_CONTENT_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}

},{"../constants/token-types":2,"../constants/tokenizer-context-factories":3,"../helpers":4}],28:[function(require,module,exports){
const dataContextFactory = require('./tokenize-contexts/data.factory')
const openTagStartContextFactory = require('./tokenize-contexts/open-tag-start.factory')
const closeTagContextFactory = require('./tokenize-contexts/close-tag.factory')
const openTagEndContextFactory = require('./tokenize-contexts/open-tag-end.factory')
const attributesContextFactory = require('./tokenize-contexts/attributes.factory')
const attributeAssignmentContextFactory = require('./tokenize-contexts/attribute-assignment.factory')
const attributeKeyContextFactory = require('./tokenize-contexts/attribute-key.factory')
const attributeValueContextFactory = require('./tokenize-contexts/attribute-value.factory')
const attributeValueWrappedStartContextFactory = require('./tokenize-contexts/attribute-value-wrapped-start.factory')
const attributeValueBareContextFactory = require('./tokenize-contexts/attribute-value-bare.factory')
const attributeValueWrappedContextFactory = require('./tokenize-contexts/attribute-value-wrapped.factory')
const attributeValueWrappedEndContextFactory = require('./tokenize-contexts/attribute-value-wrapped-end.factory')
const scriptContentContextFactory = require('./tokenize-contexts/script-tag-content.factory')
const doctypeStartContextFactory = require('./tokenize-contexts/doctype-start.factory')
const doctypeEndContextFactory = require('./tokenize-contexts/doctype-end.factory')
const doctypeAttributesContextFactory = require('./tokenize-contexts/doctype-attributes.factory')
const doctypeAttributeWrappedStartContextFactory = require('./tokenize-contexts/doctype-attribute-wrapped-start.factory')
const doctypeAttributeWrappedContextFactory = require('./tokenize-contexts/doctype-attribute-wrapped.factory')
const doctypeAttributeWrappedEndContextFactory = require('./tokenize-contexts/doctype-attribute-wrapped-end.factory')
const doctypeAttributeBareEndContextFactory = require('./tokenize-contexts/doctype-attribute-bare.factory')
const commentStartContextFactory = require('./tokenize-contexts/comment-start.factory')
const commentContentContextFactory = require('./tokenize-contexts/comment-content.factory')
const commentEndContextFactory = require('./tokenize-contexts/comment-end.factory')

const {
  DATA_FACTORY,
  OPEN_TAG_START_FACTORY,
  CLOSE_TAG_FACTORY,
  ATTRIBUTES_FACTORY,
  OPEN_TAG_END_FACTORY,
  ATTRIBUTE_ASSIGNMENT_FACTORY,
  ATTRIBUTE_KEY_FACTORY,
  ATTRIBUTE_VALUE_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
  ATTRIBUTE_VALUE_BARE_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_END_FACTORY,
  SCRIPT_CONTENT_FACTORY,
  DOCTYPE_START_FACTORY,
  DOCTYPE_END_FACTORY,
  DOCTYPE_ATTRIBUTES_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY,
  DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY,
  DOCTYPE_ATTRIBUTE_BARE_FACTORY,
  COMMENT_START_FACTORY,
  COMMENT_CONTENT_FACTORY,
  COMMENT_END_FACTORY
} = require('./constants/tokenizer-context-factories')

const contextFactoriesMap = {
  [DATA_FACTORY]: dataContextFactory,
  [OPEN_TAG_START_FACTORY]: openTagStartContextFactory,
  [CLOSE_TAG_FACTORY]: closeTagContextFactory,
  [ATTRIBUTES_FACTORY]: attributesContextFactory,
  [OPEN_TAG_END_FACTORY]: openTagEndContextFactory,
  [ATTRIBUTE_ASSIGNMENT_FACTORY]: attributeAssignmentContextFactory,
  [ATTRIBUTE_KEY_FACTORY]: attributeKeyContextFactory,
  [ATTRIBUTE_VALUE_FACTORY]: attributeValueContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_START_FACTORY]: attributeValueWrappedStartContextFactory,
  [ATTRIBUTE_VALUE_BARE_FACTORY]: attributeValueBareContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_FACTORY]: attributeValueWrappedContextFactory,
  [ATTRIBUTE_VALUE_WRAPPED_END_FACTORY]: attributeValueWrappedEndContextFactory,
  [SCRIPT_CONTENT_FACTORY]: scriptContentContextFactory,
  [DOCTYPE_START_FACTORY]: doctypeStartContextFactory,
  [DOCTYPE_END_FACTORY]: doctypeEndContextFactory,
  [DOCTYPE_ATTRIBUTES_FACTORY]: doctypeAttributesContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_START_FACTORY]: doctypeAttributeWrappedStartContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_FACTORY]: doctypeAttributeWrappedContextFactory,
  [DOCTYPE_ATTRIBUTE_WRAPPED_END_FACTORY]: doctypeAttributeWrappedEndContextFactory,
  [DOCTYPE_ATTRIBUTE_BARE_FACTORY]: doctypeAttributeBareEndContextFactory,
  [COMMENT_START_FACTORY]: commentStartContextFactory,
  [COMMENT_CONTENT_FACTORY]: commentContentContextFactory,
  [COMMENT_END_FACTORY]: commentEndContextFactory
}

function handleSyntaxForBuffer (state, tokens) {
  const syntaxHandler = state.currentContext.parseSyntax(state.decisionBuffer)

  if (syntaxHandler) {
    return syntaxHandler(state, tokens)
  }

  return undefined
}

function handleContentEnd (state, tokens) {
  if (state.currentContext.handleContentEnd) {
    return state.currentContext.handleContentEnd(state, tokens)
  }

  return undefined
}


function tokenizeChars (
  chars,
  state,
  tokens,
  { isFinalChunk, positionOffset }
) {
  let updatedState = Object.assign({}, state)
  let updatedTokens = tokens
  let charIndex = updatedState.caretPosition - positionOffset

  while (charIndex < chars.length) {
    updatedState.decisionBuffer += chars[charIndex]

    let handlerResult = handleSyntaxForBuffer(updatedState, tokens)

    if (handlerResult === undefined) {
      updatedState.accumulatedContent += updatedState.decisionBuffer
      updatedState.decisionBuffer = ''
    } else {
      updatedState = handlerResult.updatedState
      updatedTokens = handlerResult.updatedTokens
    }

    updatedState.caretPosition++
    charIndex = updatedState.caretPosition - positionOffset
  }

  if (isFinalChunk) {
    // Move the caret back, as at this point
    // it in the position outside of chars array,
    // and it should not be taken into account
    // when calculating characters range
    updatedState.caretPosition--

    let handlerResult = handleContentEnd(updatedState, tokens)

    if (handlerResult !== undefined) {
      updatedState = handlerResult.updatedState
      updatedTokens = handlerResult.updatedTokens
    }
  }

  return { updatedState, updatedTokens }
}

function tokenize (
  content = '',
  existingState,
  { isFinalChunk, positionOffset } = {}
) {
  isFinalChunk = isFinalChunk === undefined ? true : isFinalChunk
  positionOffset = positionOffset === undefined ? 0 : positionOffset

  const chars = [...content]
  const state = existingState || {
    currentContext: dataContextFactory(contextFactoriesMap),
    decisionBuffer: '',
    accumulatedContent: '',
    caretPosition: 0
  }
  const tokens = []

  const result = tokenizeChars(chars, state, tokens, {
    isFinalChunk, positionOffset
  })

  return {
    state: result.updatedState,
    tokens: result.updatedTokens
  }
}

module.exports = tokenize

},{"./constants/tokenizer-context-factories":3,"./tokenize-contexts/attribute-assignment.factory":5,"./tokenize-contexts/attribute-key.factory":6,"./tokenize-contexts/attribute-value-bare.factory":7,"./tokenize-contexts/attribute-value-wrapped-end.factory":8,"./tokenize-contexts/attribute-value-wrapped-start.factory":9,"./tokenize-contexts/attribute-value-wrapped.factory":10,"./tokenize-contexts/attribute-value.factory":11,"./tokenize-contexts/attributes.factory":12,"./tokenize-contexts/close-tag.factory":13,"./tokenize-contexts/comment-content.factory":14,"./tokenize-contexts/comment-end.factory":15,"./tokenize-contexts/comment-start.factory":16,"./tokenize-contexts/data.factory":17,"./tokenize-contexts/doctype-attribute-bare.factory":18,"./tokenize-contexts/doctype-attribute-wrapped-end.factory":19,"./tokenize-contexts/doctype-attribute-wrapped-start.factory":20,"./tokenize-contexts/doctype-attribute-wrapped.factory":21,"./tokenize-contexts/doctype-attributes.factory":22,"./tokenize-contexts/doctype-end.factory":23,"./tokenize-contexts/doctype-start.factory":24,"./tokenize-contexts/open-tag-end.factory":25,"./tokenize-contexts/open-tag-start.factory":26,"./tokenize-contexts/script-tag-content.factory":27}]},{},[28]);
