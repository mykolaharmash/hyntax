const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
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
    content: '\n  dummy content\n\n  ',
    startPosition: 5,
    endPosition: 24
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 25,
    endPosition: 31
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 33,
    endPosition: 36
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 37,
    endPosition: 37
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 38,
    endPosition: 38
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/javascript',
    startPosition: 39,
    endPosition: 53
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 54,
    endPosition: 54
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'some-custom',
    startPosition: 56,
    endPosition: 66
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 68,
    endPosition: 68
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 71,
    endPosition: 71
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'thing',
    startPosition: 72,
    endPosition: 76
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 77,
    endPosition: 77
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 79,
    endPosition: 79
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n    console.log(\'test 1\')\n  ',
    startPosition: 80,
    endPosition: 108
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 109,
    endPosition: 117
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n  ',
    startPosition: 118,
    endPosition: 121
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 122,
    endPosition: 128
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 134,
    endPosition: 137
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 138,
    endPosition: 138
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 139,
    endPosition: 139
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/javascript',
    startPosition: 140,
    endPosition: 154
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 155,
    endPosition: 155
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'async',
    startPosition: 161,
    endPosition: 165
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 169,
    endPosition: 169
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n    let a = \'<div></div>\'\n    console.log(a)\n  ',
    startPosition: 170,
    endPosition: 217
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 218,
    endPosition: 226
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 227,
    endPosition: 227
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 228,
    endPosition: 233
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 234,
    endPosition: 235
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 236,
    endPosition: 242
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'async',
    startPosition: 244,
    endPosition: 248
  },

  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 250,
    endPosition: 253
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 254,
    endPosition: 254
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 255,
    endPosition: 255
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/javascript',
    startPosition: 256,
    endPosition: 270
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 271,
    endPosition: 271
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 272,
    endPosition: 272
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n  console.log(\'test 2\')\n',
    startPosition: 273,
    endPosition: 297
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 298,
    endPosition: 306
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 307,
    endPosition: 307
  }
]
