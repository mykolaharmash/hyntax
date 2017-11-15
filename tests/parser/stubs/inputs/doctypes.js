const {
  TOKEN_DOCTYPE_START,
  TOKEN_DOCTYPE_END,
  TOKEN_TEXT,
  TOKEN_DOCTYPE_ATTRIBUTE,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END
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
    content: '<!DOCTYPE',
    startPosition: 24,
    endPosition: 32
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    content: '"',
    startPosition: 34,
    endPosition: 34
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'some attribute',
    startPosition: 35,
    endPosition: 48
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
    content: '"',
    startPosition: 49,
    endPosition: 49
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    content: '\'',
    startPosition: 51,
    endPosition: 51
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'another-one',
    startPosition: 52,
    endPosition: 62
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
    content: '\'',
    startPosition: 63,
    endPosition: 63
  },
  {
    type: TOKEN_DOCTYPE_END,
    content: '>',
    startPosition: 65,
    endPosition: 65
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 66,
    endPosition: 67
  },
  {
    type: TOKEN_DOCTYPE_START,
    content: '<!DOCTYPE',
    startPosition: 68,
    endPosition: 76
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'html',
    startPosition: 78,
    endPosition: 81
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'PUBLIC',
    startPosition: 83,
    endPosition: 88
  },
  {
    type: TOKEN_DOCTYPE_END,
    content: '>',
    startPosition: 89,
    endPosition: 89
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 90,
    endPosition: 91
  },
  {
    type: TOKEN_DOCTYPE_START,
    content: '<!DOCTYPE',
    startPosition: 92,
    endPosition: 100
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'HTML',
    startPosition: 102,
    endPosition: 105
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'PUBLIC',
    startPosition: 107,
    endPosition: 112
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    content: '"',
    startPosition: 114,
    endPosition: 114
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: '-//W3C//DTD HTML 4.01 Frameset//EN',
    startPosition: 115,
    endPosition: 148
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
    content: '"',
    startPosition: 149,
    endPosition: 149
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
    content: '"',
    startPosition: 151,
    endPosition: 151
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE,
    content: 'http://www.w3.org/TR/html4/frameset.dtd',
    startPosition: 152,
    endPosition: 190
  },
  {
    type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
    content: '"',
    startPosition: 191,
    endPosition: 191
  },
  {
    type: TOKEN_DOCTYPE_END,
    content: '>',
    startPosition: 192,
    endPosition: 192
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 303,
    endPosition: 303
  }
]
