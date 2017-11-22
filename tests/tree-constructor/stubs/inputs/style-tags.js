const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START_STYLE,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_STYLE_TAG_CONTENT,
  TOKEN_CLOSE_TAG_STYLE,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

const inputHtml = `
<style>
  body {
    background-color: red;
  }
</style>

<div>
  test
  
  <style type="text/css" rel="stylesheet">
    body {
      background-color: white;
    }
  </style>
</div>

<style type="text/css" rel="stylesheet">
  body {
    background-color: black;
  }
</style>
`

const inputTokens = [
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 0,
    endPosition: 0
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 1,
    endPosition: 6
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 7,
    endPosition: 7
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n  body {\n    background-color: red;\n  }\n',
    startPosition: 8,
    endPosition: 48
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 49,
    endPosition: 56
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 57,
    endPosition: 58
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 59,
    endPosition: 62
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 63,
    endPosition: 63
  },
  {
    type: TOKEN_TEXT,
    content: '\n  test\n  \n  ',
    startPosition: 64,
    endPosition: 76
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 77,
    endPosition: 82
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 84,
    endPosition: 87
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 88,
    endPosition: 88
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 89,
    endPosition: 89
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/css',
    startPosition: 90,
    endPosition: 97
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 98,
    endPosition: 98
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'rel',
    startPosition: 100,
    endPosition: 102
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 103,
    endPosition: 103
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 104,
    endPosition: 104
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'stylesheet',
    startPosition: 105,
    endPosition: 114
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 115,
    endPosition: 115
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 116,
    endPosition: 116
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n    body {\n      background-color: white;\n    }\n  ',
    startPosition: 117,
    endPosition: 167
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 168,
    endPosition: 175
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 176,
    endPosition: 176
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 177,
    endPosition: 182
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 183,
    endPosition: 184
  },
  {
    type: TOKEN_OPEN_TAG_START_STYLE,
    content: '<style',
    startPosition: 185,
    endPosition: 190
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 192,
    endPosition: 195
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 196,
    endPosition: 196
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 197,
    endPosition: 197
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/css',
    startPosition: 198,
    endPosition: 205
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 206,
    endPosition: 206
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'rel',
    startPosition: 208,
    endPosition: 210
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 211,
    endPosition: 211
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 212,
    endPosition: 212
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'stylesheet',
    startPosition: 213,
    endPosition: 222
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 223,
    endPosition: 223
  },
  {
    type: TOKEN_OPEN_TAG_END_STYLE,
    content: '>',
    startPosition: 224,
    endPosition: 224
  },
  {
    type: TOKEN_STYLE_TAG_CONTENT,
    content: '\n  body {\n    background-color: black;\n  }\n',
    startPosition: 225,
    endPosition: 267
  },
  {
    type: TOKEN_CLOSE_TAG_STYLE,
    content: '</style>',
    startPosition: 268,
    endPosition: 275
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 276,
    endPosition: 276
  }
]


module.exports = { inputHtml, inputTokens }
