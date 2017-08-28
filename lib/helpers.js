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

module.exports = {
  cloneDeep,
  prettyJSON,
  clearContext
}
