const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_START,
  TOKEN_COMMENT_CONTENT,
  TOKEN_COMMENT_END
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 0,
    endPosition: 3
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: ' some comment ',
    startPosition: 4,
    endPosition: 17
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 18,
    endPosition: 20
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 21,
    endPosition: 22
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 23,
    endPosition: 26
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 27,
    endPosition: 27
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 28,
    endPosition: 30
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 31,
    endPosition: 35
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 36,
    endPosition: 36
  },
  {
    type: TOKEN_TEXT,
    content: '\n    ',
    startPosition: 37,
    endPosition: 41
  },
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 42,
    endPosition: 45
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: 'another-one',
    startPosition: 46,
    endPosition: 56
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 57,
    endPosition: 59
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 60,
    endPosition: 62
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 63,
    endPosition: 69
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n  ',
    startPosition: 70,
    endPosition: 73
  },
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 74,
    endPosition: 77
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: '\n\n  multi\n\n  line\n  ',
    startPosition: 78,
    endPosition: 97
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 98,
    endPosition: 100
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 101,
    endPosition: 101
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 102,
    endPosition: 107
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 108,
    endPosition: 109
  },
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 110,
    endPosition: 113
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: ' closing\n\ncomment ',
    startPosition: 114,
    endPosition: 131
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 132,
    endPosition: 134
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 135,
    endPosition: 135
  }
]
