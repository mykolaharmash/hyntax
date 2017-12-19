const OPEN_TAG_NAME_PATTERN = /^<(\S+)/
const CLOSE_TAG_NAME_PATTERN = /^<\/((?:.|\n)*)>$/

function prettyJSON (obj) {
  return JSON.stringify(obj, null, 2)
}

/**
 * Clear tree of nodes from everything
 * "parentRef" properties so the tree
 * can be easily stringified into JSON.
 */
function clearAst (ast) {
  const cleanAst = ast

  delete cleanAst.parentRef

  if (Array.isArray(ast.content.children)) {
    cleanAst.content.children = ast.content.children.map((node) => {
      return clearAst(node)
    })
  }

  return cleanAst
}

function parseOpenTagName (openTagStartTokenContent) {
  const match = openTagStartTokenContent.match(OPEN_TAG_NAME_PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse open tag name.\n' +
      `${ openTagStartTokenContent } does not match pattern of opening tag.`
    )
  }

  return match[1].toLowerCase()
}

function parseCloseTagName (closeTagTokenContent) {
  const match = closeTagTokenContent.match(CLOSE_TAG_NAME_PATTERN)

  if (match === null) {
    throw new Error(
      'Unable to parse close tag name.\n' +
      `${ closeTagTokenContent } does not match pattern of closing tag.`
    )
  }

  return match[1].trim().toLowerCase()
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
  return char === ' ' || char === '\n' || char === '\t'
}

module.exports = {
  prettyJSON,
  clearAst,
  parseOpenTagName,
  parseCloseTagName,
  calculateTokenCharactersRange,
  isWhitespace
}
