const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<custom-one',
    startPosition: 0,
    endPosition: 10
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 11,
    endPosition: 11
  },
  {
    type: TOKEN_TEXT,
    content: '\n  some text\n\n  ',
    startPosition: 12,
    endPosition: 27
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<custom-two',
    startPosition: 28,
    endPosition: 38
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 39,
    endPosition: 39
  },
  {
    type: TOKEN_TEXT,
    content: '\n    another text\n  ',
    startPosition: 40,
    endPosition: 59
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</custom-two>',
    startPosition: 60,
    endPosition: 72
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 73,
    endPosition: 73
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</custom-one>',
    startPosition: 74,
    endPosition: 86
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 87,
    endPosition: 87
  }
]
