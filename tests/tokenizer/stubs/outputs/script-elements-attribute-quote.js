const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
  TOKEN_ATTRIBUTE_VALUE_QUOTE,
  TOKEN_ATTRIBUTE_VALUE_QUOTE_END
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n  dummy content\n\n  ',
    startPosition: 5,
    endPosition: 24
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script'
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
    content: 'text/javascript'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_END,
    content: '"'
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'some-custom'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
    content: 'thing'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_END,
    content: '"'
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>'
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n    console.log(\'test 1\')\n  '
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n  ',
    startPosition: 118,
    endPosition: 121
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script'
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
    content: 'text/javascript'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_END,
    content: '"'
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'async'
  },

  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>'
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n    let a = \'<div></div>\'\n    console.log(a)\n  '
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 227,
    endPosition: 227
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 234,
    endPosition: 235
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script'
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'async'
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE,
    content: 'text/javascript'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_QUOTE_END,
    content: '"'
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>'
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n  console.log(\'test 2\')\n'
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 307,
    endPosition: 307
  }
]
