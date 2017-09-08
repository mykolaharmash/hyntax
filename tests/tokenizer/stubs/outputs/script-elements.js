const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_CLOSE_TAG_SCRIPT
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
    content: '<div'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 19,
    endPosition: 21
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script'
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>'
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n    console.log(\'\')\n  ',
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 62,
    endPosition: 62
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n\nclosing text\n',
    startPosition: 69,
    endPosition: 83
  }
]
