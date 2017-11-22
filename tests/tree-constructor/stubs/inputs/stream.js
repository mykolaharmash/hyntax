const {
  TOKEN_TEXT,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_START,
  TOKEN_COMMENT_CONTENT,
  TOKEN_COMMENT_END,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END
} = require('../../../../lib/constants/token-types')

const inputHtml = `
test

<div class="apostrophe-class" custom-attr="attr-value">
  some content
</div>

<!-- test comment  -->

<div>
  rsdjfkl < jsdfljdsf
  
  <some-component ="some-thing"></some-component>
</div>

`

const inputChunks = [
  [
    {
      'type': TOKEN_TEXT,
      'content': '\ntest\n\n',
      'startPosition': 0,
      'endPosition': 6
    }
  ],
  [
    {
      'type': TOKEN_OPEN_TAG_START,
      'content': '<div',
      'startPosition': 7,
      'endPosition': 10
    },
    {
      'type': TOKEN_ATTRIBUTE_KEY,
      'content': 'class',
      'startPosition': 12,
      'endPosition': 16
    },
    {
      'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
      'content': '=',
      'startPosition': 17,
      'endPosition': 17
    }
  ],
  [
    {
      'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      'content': '\'',
      'startPosition': 18,
      'endPosition': 18
    },
    {
      'type': TOKEN_ATTRIBUTE_VALUE,
      'content': 'apostrophe-class',
      'startPosition': 19,
      'endPosition': 34
    },
    {
      'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      'content': '\'',
      'startPosition': 35,
      'endPosition': 35
    },
    {
      'type': TOKEN_ATTRIBUTE_KEY,
      'content': 'custom-attr',
      'startPosition': 37,
      'endPosition': 47
    },
    {
      'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
      'content': '=',
      'startPosition': 48,
      'endPosition': 48
    },
    {
      'type': TOKEN_ATTRIBUTE_VALUE,
      'content': 'attr-value',
      'startPosition': 49,
      'endPosition': 58
    },
    {
      'type': TOKEN_OPEN_TAG_END,
      'content': '>',
      'startPosition': 59,
      'endPosition': 59
    }
  ],
  [
    {
      'type': TOKEN_TEXT,
      'content': '\n  some content\n',
      'startPosition': 60,
      'endPosition': 75
    },
    {
      'type': TOKEN_CLOSE_TAG,
      'content': '</div>',
      'startPosition': 76,
      'endPosition': 81
    }
  ],
  [
    {
      'type': TOKEN_TEXT,
      'content': '\n\n',
      'startPosition': 82,
      'endPosition': 83
    },
    {
      'type': TOKEN_COMMENT_START,
      'content': '<!--',
      'startPosition': 84,
      'endPosition': 87
    },
    {
      'type': TOKEN_COMMENT_CONTENT,
      'content': ' test comment  ',
      'startPosition': 88,
      'endPosition': 102
    }
  ],
  [
    {
      'type': TOKEN_COMMENT_END,
      'content': '-->',
      'startPosition': 103,
      'endPosition': 105
    }
  ],
  [
    {
      'type': TOKEN_OPEN_TAG_START,
      'content': '<div',
      'startPosition': 108,
      'endPosition': 111
    },
    {
      'type': TOKEN_OPEN_TAG_END,
      'content': '>',
      'startPosition': 112,
      'endPosition': 112
    }
  ],
  [
    {
      'type': TOKEN_TEXT,
      'content': '\n  rsdjfkl < jsdfljdsf\n  \n  ',
      'startPosition': 113,
      'endPosition': 140
    },
    {
      'type': TOKEN_OPEN_TAG_START,
      'content': '<some-component',
      'startPosition': 141,
      'endPosition': 155
    },
    {
      'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
      'content': '=',
      'startPosition': 157,
      'endPosition': 157
    },
    {
      'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      'content': '"',
      'startPosition': 158,
      'endPosition': 158
    },
    {
      'type': TOKEN_ATTRIBUTE_VALUE,
      'content': 'some-thing',
      'startPosition': 159,
      'endPosition': 168
    },
    {
      'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      'content': '"',
      'startPosition': 169,
      'endPosition': 169
    },
    {
      'type': TOKEN_OPEN_TAG_END,
      'content': '>',
      'startPosition': 170,
      'endPosition': 170
    },
    {
      'type': TOKEN_CLOSE_TAG,
      'content': '</some-component>',
      'startPosition': 171,
      'endPosition': 187
    }
  ],
  [
    {
      'type': TOKEN_TEXT,
      'content': '\n',
      'startPosition': 188,
      'endPosition': 188
    },
    {
      'type': TOKEN_CLOSE_TAG,
      'content': '</div>',
      'startPosition': 189,
      'endPosition': 194
    },
    {
      'type': TOKEN_TEXT,
      'content': '\n\n',
      'startPosition': 195,
      'endPosition': 196
    }
  ]
]

module.exports = { inputHtml, inputChunks }
