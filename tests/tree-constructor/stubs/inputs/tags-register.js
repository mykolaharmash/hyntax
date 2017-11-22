const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

const inputHtml = `
<div>
</DIV>

<DIV></div>

<span>
</span>

<SPAN></SPAN>
`

const inputTokens = [
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 0,
    endPosition: 0
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 1,
    endPosition: 4
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 5,
    endPosition: 5
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 6,
    endPosition: 6
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</DIV>',
    startPosition: 7,
    endPosition: 12
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 13,
    endPosition: 14
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<DIV',
    startPosition: 15,
    endPosition: 18
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 19,
    endPosition: 19
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 20,
    endPosition: 25
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 26,
    endPosition: 27
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<span',
    startPosition: 28,
    endPosition: 32
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 33,
    endPosition: 33
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 34,
    endPosition: 34
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</span>',
    startPosition: 35,
    endPosition: 41
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 42,
    endPosition: 43
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<SPAN',
    startPosition: 44,
    endPosition: 48
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 49,
    endPosition: 49
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</SPAN>',
    startPosition: 50,
    endPosition: 56
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 57,
    endPosition: 57
  }
]

module.exports = { inputHtml, inputTokens }

