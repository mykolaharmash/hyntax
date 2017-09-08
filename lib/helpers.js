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

function clearContext (context) {
  let cleanContext = {
    type: context.type
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
