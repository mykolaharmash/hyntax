const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 0,
    endPosition: 3
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'key',
    startPosition: 5,
    endPosition: 7
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 10,
    endPosition: 10
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'value',
    startPosition: 11,
    endPosition: 15
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'and-another',
    startPosition: 18,
    endPosition: 28
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 29,
    endPosition: 29
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'value',
    startPosition: 32,
    endPosition: 36
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 37,
    endPosition: 37
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 38,
    endPosition: 43
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 44,
    endPosition: 45
  },

  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 46,
    endPosition: 50
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'some',
    startPosition: 52,
    endPosition: 55
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 56,
    endPosition: 56
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'custom-attribute',
    startPosition: 57,
    endPosition: 72
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 73,
    endPosition: 73
  },
  {
    type: TOKEN_TEXT,
    content: '\n  some text\n\n  ',
    startPosition: 74,
    endPosition: 89
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<custom-element',
    startPosition: 90,
    endPosition: 104
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'and',
    startPosition: 106,
    endPosition: 108
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 109,
    endPosition: 109
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'here',
    startPosition: 110,
    endPosition: 113
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'and-even',
    startPosition: 119,
    endPosition: 126
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 128,
    endPosition: 128
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'here',
    startPosition: 130,
    endPosition: 133
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 137,
    endPosition: 137
  },
  {
    type: TOKEN_TEXT,
    content: '\n    custom element\n    text\n  ',
    startPosition: 138,
    endPosition: 168
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</custom-element>',
    startPosition: 169,
    endPosition: 185
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 186,
    endPosition: 186
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 187,
    endPosition: 193
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 194,
    endPosition: 194
  }
]
