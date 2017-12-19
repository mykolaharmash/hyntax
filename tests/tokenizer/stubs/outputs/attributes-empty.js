const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 0,
    endPosition: 4
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 6,
    endPosition: 6
  },
  {
    type: TOKEN_TEXT,
    content: '\n  some text\n\n  ',
    startPosition: 7,
    endPosition: 22
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<custom-element',
    startPosition: 23,
    endPosition: 37
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 42,
    endPosition: 42
  },
  {
    type: TOKEN_TEXT,
    content: '\n    custom element\n    text\n  ',
    startPosition: 43,
    endPosition: 73
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</custom-element>',
    startPosition: 74,
    endPosition: 90
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 91,
    endPosition: 91
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 92,
    endPosition: 98
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 99,
    endPosition: 99
  }
]
