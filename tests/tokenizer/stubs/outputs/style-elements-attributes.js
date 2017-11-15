const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START_STYLE,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_STYLE_TAG_CONTENT,
  TOKEN_CLOSE_TAG_STYLE,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 0,
    endPosition: 5
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 7,
    endPosition: 10
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 11,
    endPosition: 11
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 12,
    endPosition: 12
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/css',
    startPosition: 13,
    endPosition: 20
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 21,
    endPosition: 21
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'custom',
    startPosition: 23,
    endPosition: 28
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 29,
    endPosition: 29
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 30,
    endPosition: 30
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'attribute',
    startPosition: 31,
    endPosition: 39
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 40,
    endPosition: 40
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 41,
    endPosition: 41
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n  body {\n    background-color: white;\n  }\n',
    startPosition: 42,
    endPosition: 84
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 85,
    endPosition: 92
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 93,
    endPosition: 94
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 95,
    endPosition: 98
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 99,
    endPosition: 99
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 100,
    endPosition: 102
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 103,
    endPosition: 108
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'custom',
    startPosition: 114,
    endPosition: 119
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 125,
    endPosition: 128
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 129,
    endPosition: 129
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 130,
    endPosition: 130
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/css',
    startPosition: 131,
    endPosition: 138
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 139,
    endPosition: 139
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'another-custom',
    startPosition: 146,
    endPosition: 159
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 163,
    endPosition: 163
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n    body {\n      background-color: red;\n    }\n  ',
    startPosition: 164,
    endPosition: 212
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 213,
    endPosition: 220
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 221,
    endPosition: 221
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 222,
    endPosition: 227
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 228,
    endPosition: 228
  }
]
