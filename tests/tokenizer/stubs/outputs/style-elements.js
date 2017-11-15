const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START_STYLE,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_STYLE_TAG_CONTENT,
  TOKEN_CLOSE_TAG_STYLE
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_TEXT,
    content: 'opening text\n\n',
    startPosition: 0,
    endPosition: 13
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 14,
    endPosition: 19
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 20,
    endPosition: 20
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n  body {\n    background-color: white;\n  }\n',
    startPosition: 21,
    endPosition: 63
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 64,
    endPosition: 71
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 72,
    endPosition: 73
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 74,
    endPosition: 77
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 78,
    endPosition: 78
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 79,
    endPosition: 81
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 82,
    endPosition: 87
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 88,
    endPosition: 88
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n    body {\n      background-color: red;\n    }\n  ',
    startPosition: 89,
    endPosition: 137
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 138,
    endPosition: 145
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 146,
    endPosition: 146
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 147,
    endPosition: 152
  },
  {
    type: TOKEN_TEXT,
    content: '\n\nclosing text\n',
    startPosition: 153,
    endPosition: 167
  }
]
