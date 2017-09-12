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
    content: '<div'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 5,
    endPosition: 7
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span'
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'class'
  },
  {
    type:  TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'test class'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'data-test'
  },
  {
    type:  TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'data<test>'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n    some text\n\n    ',
    startPosition: 56,
    endPosition: 75
  },
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
    content: '\n      another text\n\n      ',
    startPosition: 81,
    endPosition: 107
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<custom-element'
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'custom-attr'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'custom >test'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'with-spaces'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'spaces test'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n        custom element\n        text\n      ',
    startPosition: 205,
    endPosition: 247
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</custom-element>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n    ',
    startPosition: 265,
    endPosition: 269
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 276,
    endPosition: 278
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 286,
    endPosition: 286
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 293,
    endPosition: 293
  }
]
