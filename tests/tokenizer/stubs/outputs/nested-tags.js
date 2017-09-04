const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
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
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n    some text\n\n    ',
    startPosition: 14,
    endPosition: 33
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n      another text\n    ',
    startPosition: 40,
    endPosition: 63
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 71,
    endPosition: 73
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 81,
    endPosition: 81
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 88,
    endPosition: 88
  }
]
