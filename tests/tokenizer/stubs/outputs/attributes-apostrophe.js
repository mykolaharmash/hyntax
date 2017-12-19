const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 0,
    endPosition: 3
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 4,
    endPosition: 4
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 5,
    endPosition: 7
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 8,
    endPosition: 12
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'class',
    startPosition: 14,
    endPosition: 18
  },
  {
    type:  TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 19,
    endPosition: 19
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '\'',
    startPosition: 20,
    endPosition: 20
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'test class',
    startPosition: 21,
    endPosition: 30
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '\'',
    startPosition: 31,
    endPosition: 31
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'data-test',
    startPosition: 33,
    endPosition: 41
  },
  {
    type:  TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 42,
    endPosition: 42
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '\'',
    startPosition: 43,
    endPosition: 43
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'data<test>',
    startPosition: 44,
    endPosition: 53
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '\'',
    startPosition: 54,
    endPosition: 54
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 55,
    endPosition: 55
  },
  {
    type: TOKEN_TEXT,
    content: '\n    some text\n\n    ',
    startPosition: 56,
    endPosition: 75
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 76,
    endPosition: 79
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 80,
    endPosition: 80
  },
  {
    type: TOKEN_TEXT,
    content: '\n      another text\n\n      ',
    startPosition: 81,
    endPosition: 107
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<custom-element',
    startPosition: 108,
    endPosition: 122
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'custom-attr',
    startPosition: 132,
    endPosition: 142
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 143,
    endPosition: 143
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '\'',
    startPosition: 144,
    endPosition: 144
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'custom >test',
    startPosition: 145,
    endPosition: 156
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '\'',
    startPosition: 157,
    endPosition: 157
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'with-spaces',
    startPosition: 167,
    endPosition: 177
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 181,
    endPosition: 181
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '\'',
    startPosition: 184,
    endPosition: 184
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'spaces test',
    startPosition: 185,
    endPosition: 195
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '\'',
    startPosition: 196,
    endPosition: 196
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 204,
    endPosition: 204
  },
  {
    type: TOKEN_TEXT,
    content: '\n        custom element\n        text\n      ',
    startPosition: 205,
    endPosition: 247
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</custom-element>',
    startPosition: 248,
    endPosition: 264
  },
  {
    type: TOKEN_TEXT,
    content: '\n    ',
    startPosition: 265,
    endPosition: 269
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 270,
    endPosition: 275
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 276,
    endPosition: 278
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 279,
    endPosition: 285
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 286,
    endPosition: 286
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 287,
    endPosition: 292
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 293,
    endPosition: 293
  }
]
