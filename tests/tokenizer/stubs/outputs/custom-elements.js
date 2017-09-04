const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

module.exports = [
  { type: TOKEN_TEXT, content: '' },
  { type: TOKEN_OPEN_TAG_START, content: '<custom-one' },
  { type: TOKEN_OPEN_TAG_END, content: '>' },
  { type: TOKEN_TEXT, content: '\n  some text\n\n  ' },
  { type: TOKEN_OPEN_TAG_START, content: '<custom-two' },
  { type: TOKEN_OPEN_TAG_END, content: '>' },
  { type: TOKEN_TEXT, content: '\n    another text\n  ' },
  { type: TOKEN_CLOSE_TAG, content: '</custom-two>' },
  { type: TOKEN_TEXT, content: '\n' },
  { type: TOKEN_CLOSE_TAG, content: '</custom-one>' },
  { type: TOKEN_TEXT, content: '\n' }
]
