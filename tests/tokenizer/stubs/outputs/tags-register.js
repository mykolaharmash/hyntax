const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_OPEN_TAG_START_STYLE,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_CLOSE_TAG_STYLE,
  TOKEN_STYLE_TAG_CONTENT
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
    content: '\n',
    startPosition: 5,
    endPosition: 5
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</DIV>',
    startPosition: 6,
    endPosition: 11
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 12,
    endPosition: 13
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<DIV',
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
    content: '\n\n',
    startPosition: 25,
    endPosition: 26
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 27,
    endPosition: 31
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 32,
    endPosition: 32
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 33,
    endPosition: 33
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 34,
    endPosition: 40
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 41,
    endPosition: 42
  },

  {
    type: TOKEN_OPEN_TAG_START,
    content: '<SPAN',
    startPosition: 43,
    endPosition: 47
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 48,
    endPosition: 48
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</SPAN>',
    startPosition: 49,
    endPosition: 55
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 56,
    endPosition: 57
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 58,
    endPosition: 64
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 65,
    endPosition: 65
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 66,
    endPosition: 74
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 75,
    endPosition: 75
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<SCRIPT',
    startPosition: 76,
    endPosition: 82
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 83,
    endPosition: 83
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n',
    startPosition: 84,
    endPosition: 84
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</SCRIPT>',
    startPosition: 85,
    endPosition: 93
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 94,
    endPosition: 94
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<SCRIPT',
    startPosition: 95,
    endPosition: 101
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 102,
    endPosition: 102
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 103,
    endPosition: 111
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 112,
    endPosition: 112
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 113,
    endPosition: 119
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 120,
    endPosition: 120
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n',
    startPosition: 121,
    endPosition: 121
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</SCRIPT>',
    startPosition: 122,
    endPosition: 130
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 131,
    endPosition: 132
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 133,
    endPosition: 138
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 139,
    endPosition: 139
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 140,
    endPosition: 147
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 148,
    endPosition: 148
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<STYLE',
    startPosition: 149,
    endPosition: 154
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 155,
    endPosition: 155
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n',
    startPosition: 156,
    endPosition: 156
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</STYLE>',
    startPosition: 157,
    endPosition: 164
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 165,
    endPosition: 165
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<STYLE',
    startPosition: 166,
    endPosition: 171
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 172,
    endPosition: 172
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 173,
    endPosition: 180
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 181,
    endPosition: 181
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 182,
    endPosition: 187
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 188,
    endPosition: 188
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</STYLE>',
    startPosition: 189,
    endPosition: 196
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 197,
    endPosition: 197
  }
]
