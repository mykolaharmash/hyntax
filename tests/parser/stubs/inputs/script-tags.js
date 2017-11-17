const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

const inputHtml = `
<script src="./some/script.js" async></script>

<div>
  test
  
  <script type="text/javascript">
    console.log('hello!') 
  </script>
</div>

<script type="text/javascript">
  console.log('another hello!') 
</script>
`

const inputTokens = [
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 0,
    endPosition: 0
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 1,
    endPosition: 7
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'src',
    startPosition: 9,
    endPosition: 11
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 12,
    endPosition: 12
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 13,
    endPosition: 13
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: './some/script.js',
    startPosition: 14,
    endPosition: 29
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 30,
    endPosition: 30
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'async',
    startPosition: 32,
    endPosition: 36
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 37,
    endPosition: 37
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '',
    startPosition: 38,
    endPosition: 37
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 38,
    endPosition: 46
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 47,
    endPosition: 48
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 49,
    endPosition: 52
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 53,
    endPosition: 53
  },
  {
    type: TOKEN_TEXT,
    content: '\n  test\n  \n  ',
    startPosition: 54,
    endPosition: 66
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 67,
    endPosition: 73
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 75,
    endPosition: 78
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 79,
    endPosition: 79
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 80,
    endPosition: 80
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/javascript',
    startPosition: 81,
    endPosition: 95
  },
  {
    type: 'token:attribute-value-wrapper-end',
    content: '"',
    startPosition: 96,
    endPosition: 96
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 97,
    endPosition: 97
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n    console.log(\'hello!\') \n  ',
    startPosition: 98,
    endPosition: 127
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 128,
    endPosition: 136
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 137,
    endPosition: 137
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 138,
    endPosition: 143
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 144,
    endPosition: 145
  },
  {
    type: TOKEN_OPEN_TAG_START_SCRIPT,
    content: '<script',
    startPosition: 146,
    endPosition: 152
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'type',
    startPosition: 154,
    endPosition: 157
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 158,
    endPosition: 158
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 159,
    endPosition: 159
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'text/javascript',
    startPosition: 160,
    endPosition: 174
  },
  {
    type: 'token:attribute-value-wrapper-end',
    content: '"',
    startPosition: 175,
    endPosition: 175
  },
  {
    type: TOKEN_OPEN_TAG_END_SCRIPT,
    content: '>',
    startPosition: 176,
    endPosition: 176
  },
  {
    type: TOKEN_SCRIPT_TAG_CONTENT,
    content: '\n  console.log(\'another hello!\') \n',
    startPosition: 177,
    endPosition: 210
  },
  {
    type: TOKEN_CLOSE_TAG_SCRIPT,
    content: '</script>',
    startPosition: 211,
    endPosition: 219
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 220,
    endPosition: 220
  }
]

module.exports = { inputHtml, inputTokens }
