const {
  TOKEN_DOCTYPE_START,
  TOKEN_DOCTYPE_END,
  TOKEN_TEXT
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_DOCTYPE_START,
    content: '<!DOCTYPE',
    startPosition: 0,
    endPosition: 8
  },
  {
    type: TOKEN_DOCTYPE_END,
    content: '>',
    startPosition: 9,
    endPosition: 9
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 10,
    endPosition: 11
  },
  {
    type: TOKEN_DOCTYPE_START,
    content: '<!doctype',
    startPosition: 12,
    endPosition: 20
  },
  {
    type: TOKEN_DOCTYPE_END,
    content: '>',
    startPosition: 21,
    endPosition: 21
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 22,
    endPosition: 22
  }
]
