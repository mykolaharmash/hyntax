const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
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
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 13,
    endPosition: 13
  },
  {
    type: TOKEN_TEXT,
    content: '\n    some text\n\n    ',
    startPosition: 14,
    endPosition: 33
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 34,
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
    content: '\n      another text\n    ',
    startPosition: 40,
    endPosition: 63
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 64,
    endPosition: 70
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 71,
    endPosition: 73
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 74,
    endPosition: 80
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 81,
    endPosition: 81
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 82,
    endPosition: 87
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 88,
    endPosition: 88
  }
]
