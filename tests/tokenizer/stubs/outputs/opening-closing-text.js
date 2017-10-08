const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_TEXT,
    content: 'opening text\n\n',
    startPosition: 0,
    endPosition: 13
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 14,
    endPosition: 17
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 18,
    endPosition: 18
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 19,
    endPosition: 24
  },
  {
    type: TOKEN_TEXT,
    content: '\n\nclosing text\n',
    startPosition: 25,
    endPosition: 39
  }
]
