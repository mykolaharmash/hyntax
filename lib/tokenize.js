const dataContext = require('./tokenize-contexts/data')
const openTagStartContext = require('./tokenize-contexts/open-tag-start')
const openTagEndContext = require('./tokenize-contexts/open-tag-end')
const closeTagContext = require('./tokenize-contexts/close-tag')
const attributesContext = require('./tokenize-contexts/general-tag-attributes/attributes')
const attributeKeyContext = require('./tokenize-contexts/general-tag-attributes/attribute-key')
const attributeAssignmentContext = require('./tokenize-contexts/general-tag-attributes/attribute-assignment')
const attributeValueContext = require('./tokenize-contexts/general-tag-attributes/attribute-value')
const attributeValueStartQuoteContext = require('./tokenize-contexts/general-tag-attributes/attribute-value-start-quote')
const attributeValueQuotedContext = require('./tokenize-contexts/general-tag-attributes/attribute-value-quote')
const attributeValueEndQuoteContext = require('./tokenize-contexts/general-tag-attributes/attribute-value-end-quote')
const attributeValueStartApostropheContext = require('./tokenize-contexts/attribute-value-start-apostrophe')
const attributeValueApostropheContext = require('./tokenize-contexts/attribute-value-apostrophe')
const attributeValueEndApostropheContext = require('./tokenize-contexts/attribute-value-end-apostrophe')
const attributeValueBareContext = require('./tokenize-contexts/attribute-value-bare')
const openTagEndScriptContext = require('./tokenize-contexts/open-tag-end-script')
const scriptTagContentContext = require('./tokenize-contexts/script-tag-content')
const closeTagScriptContext = require('./tokenize-contexts/close-tag-script')
const scriptAttributesContext = require('./tokenize-contexts/script-tag-attributes/script-attributes')
const scriptAttributeKeyContext = require('./tokenize-contexts/script-tag-attributes/script-attribute-key')
const scriptAttributeAssignmentContext = require('./tokenize-contexts/script-tag-attributes/script-attribute-assignment')
const scriptAttributeValueContext = require('./tokenize-contexts/script-tag-attributes/script-attribute-value')
const scriptAttributeValueStartQuoteContext = require('./tokenize-contexts/script-tag-attributes/script-attribute-value-start-quote')
const scriptAttributeValueQuoteContext = require('./tokenize-contexts/script-tag-attributes/script-attribute-value-quote')
const scriptAttributeValueEndQuoteContext = require('./tokenize-contexts/script-tag-attributes/script-attribute-value-end-quote')

const { SYMBOL_CONTENT_END } = require('./constants/symbols')

const {
  TOKENIZER_CONTEXT_DATA,
  TOKENIZER_CONTEXT_OPEN_TAG_START,
  TOKENIZER_CONTEXT_OPEN_TAG_END,
  TOKENIZER_CONTEXT_CLOSE_TAG,
  TOKENIZER_CONTEXT_ATTRIBUTES,
  TOKENIZER_CONTEXT_ATTRIBUTE_KEY,
  TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_END,
  TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE,
  TOKENIZER_CONTEXT_OPEN_TAG_END_SCRIPT,
  TOKENIZER_CONTEXT_SCRIPT_TAG_CONTENT,
  TOKENIZER_CONTEXT_CLOSE_TAG_SCRIPT,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTES,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_KEY,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_ASSIGNMENT,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE_START,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE,
  TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE_END
} = require('./constants/tokenizer-contexts')

const contextsMap = {
  [TOKENIZER_CONTEXT_DATA]: dataContext,
  [TOKENIZER_CONTEXT_OPEN_TAG_START]: openTagStartContext,
  [TOKENIZER_CONTEXT_OPEN_TAG_END]: openTagEndContext,
  [TOKENIZER_CONTEXT_CLOSE_TAG]: closeTagContext,
  [TOKENIZER_CONTEXT_ATTRIBUTES]: attributesContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_KEY]: attributeKeyContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_ASSIGNMENT]: attributeAssignmentContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE]: attributeValueContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_START]: attributeValueStartQuoteContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE]: attributeValueQuotedContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_QUOTE_END]: attributeValueEndQuoteContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_START]: attributeValueStartApostropheContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE]: attributeValueApostropheContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_APOSTROPHE_END]: attributeValueEndApostropheContext,
  [TOKENIZER_CONTEXT_ATTRIBUTE_VALUE_BARE]: attributeValueBareContext,
  [TOKENIZER_CONTEXT_OPEN_TAG_END_SCRIPT]: openTagEndScriptContext,
  [TOKENIZER_CONTEXT_SCRIPT_TAG_CONTENT]: scriptTagContentContext,
  [TOKENIZER_CONTEXT_CLOSE_TAG_SCRIPT]: closeTagScriptContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTES]: scriptAttributesContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_KEY]: scriptAttributeKeyContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_ASSIGNMENT]: scriptAttributeAssignmentContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE]: scriptAttributeValueContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE_START]: scriptAttributeValueStartQuoteContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE]: scriptAttributeValueQuoteContext,
  [TOKENIZER_CONTEXT_SCRIPT_ATTRIBUTE_VALUE_QUOTE_END]: scriptAttributeValueEndQuoteContext
}

function handleSyntaxForChar (context, state, tokens) {
  const syntaxHandler = context.parseSyntax(state.decisionBuffer)

  if (syntaxHandler) {
    return syntaxHandler(state, tokens)
  }

  return undefined
}

function handleContentEnd (context, state, tokens) {
  if (context.handleContentEnd) {
    return context.handleContentEnd(state, tokens)
  }

  return undefined
}


function tokenizeChars (chars, state, tokens) {
  let updatedState = Object.assign({}, state)
  let updatedTokens = tokens

  while (updatedState.caretPosition < chars.length) {
    const char = chars[updatedState.caretPosition]
    const currentContext = contextsMap[updatedState.currentContextType]

    if (char === SYMBOL_CONTENT_END) {
      let handlerResult = handleContentEnd(
        currentContext,
        updatedState,
        tokens
      )

      if (handlerResult !== undefined) {
        updatedState = handlerResult.updatedState
        updatedTokens = handlerResult.updatedTokens
      }

      break
    } else {
      updatedState.decisionBuffer += char

      let handlerResult = handleSyntaxForChar(
        currentContext,
        updatedState,
        tokens
      )

      if (handlerResult === undefined) {
        updatedState.accumulatedContent += updatedState.decisionBuffer
        updatedState.decisionBuffer = ''
      } else {
        updatedState = handlerResult.updatedState
        updatedTokens = handlerResult.updatedTokens
      }

      updatedState.caretPosition++
    }
  }

  return { updatedState, updatedTokens }
}

module.exports = function tokenize (
  content = '',
  existingState,
  { isFinalChunk } = { isFinalChunk: true }
) {
  const chars = [...content]

  if (isFinalChunk) {
    chars.push(SYMBOL_CONTENT_END)
  }

  const state = existingState || {
    currentContextType: TOKENIZER_CONTEXT_DATA,
    decisionBuffer: '',
    accumulatedContent: '',
    caretPosition: 0
  }
  const tokens = []

  const result = tokenizeChars(chars, state, tokens)

  return {
    state: result.updatedState,
    tokens: result.updatedTokens
  }
}
