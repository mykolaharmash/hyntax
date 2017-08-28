function cloneDeep (state) {
  return JSON.parse(JSON.stringify(state))
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

module.exports = {
  cloneDeep,
  prettyJSON,
  clearContext,
  parseOpenTagName,
  parseCloseTagName
}
