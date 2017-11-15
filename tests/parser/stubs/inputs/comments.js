const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_START,
  TOKEN_COMMENT_CONTENT,
  TOKEN_COMMENT_END
} = require('../../../../lib/constants/token-types')

const inputHtml = `
<!-- start comment -->

<div>
  <!-- 
    nested 
    comment 
   -->
</div>

<!-- end comment -->
`

const inputTokens = [
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 0,
    endPosition: 0
  },
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 1,
    endPosition: 4
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: ' start comment ',
    startPosition: 5,
    endPosition: 19
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 20,
    endPosition: 22
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 23,
    endPosition: 24
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 25,
    endPosition: 28
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 29,
    endPosition: 29
  },
  {
    type: TOKEN_TEXT,
    content: '\n  ',
    startPosition: 30,
    endPosition: 32
  },
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 33,
    endPosition: 36
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: ' \n    nested \n    comment \n   ',
    startPosition: 37,
    endPosition: 66
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 67,
    endPosition: 69
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 70,
    endPosition: 70
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 71,
    endPosition: 76
  },
  {
    type: TOKEN_TEXT,
    content: '\n\n',
    startPosition: 77,
    endPosition: 78
  },
  {
    type: TOKEN_COMMENT_START,
    content: '<!--',
    startPosition: 79,
    endPosition: 82
  },
  {
    type: TOKEN_COMMENT_CONTENT,
    content: ' end comment ',
    startPosition: 83,
    endPosition: 95
  },
  {
    type: TOKEN_COMMENT_END,
    content: '-->',
    startPosition: 96,
    endPosition: 98
  },
  {
    type: TOKEN_TEXT,
    content: '\n',
    startPosition: 99,
    endPosition: 99
  }
]

module.exports = { inputHtml, inputTokens }
