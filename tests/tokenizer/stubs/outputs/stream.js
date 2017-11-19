const {
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_TEXT,
  TOKEN_CLOSE_TAG,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
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
    content: 'some thing',
    startPosition: 5,
    endPosition: 14
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 15,
    endPosition: 20
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<some-component',
    startPosition: 21,
    endPosition: 35
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 36,
    endPosition: 36
  },
  {
    type: TOKEN_TEXT,
    content: 'another thing',
    startPosition: 37,
    endPosition: 49
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</some-component>',
    startPosition: 50,
    endPosition: 66
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 67,
    endPosition: 70
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'some',
    startPosition: 72,
    endPosition: 75
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 76,
    endPosition: 76
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"',
    startPosition: 77,
    endPosition: 77
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'attribute goes here',
    startPosition: 78,
    endPosition: 96
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"',
    startPosition: 97,
    endPosition: 97
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'and',
    startPosition: 99,
    endPosition: 101
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '=',
    startPosition: 102,
    endPosition: 102
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'here',
    startPosition: 103,
    endPosition: 106
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 107,
    endPosition: 107
  },
  {
    type: TOKEN_TEXT,
    content: 'more content',
    startPosition: 108,
    endPosition: 119
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 120,
    endPosition: 125
  },
  {
    type: TOKEN_TEXT,
    content: 'closing text splitted tag start ',
    startPosition: 126,
    endPosition: 157
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div',
    startPosition: 158,
    endPosition: 161
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>',
    startPosition: 162,
    endPosition: 162
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>',
    startPosition: 163,
    endPosition: 168
  }
]
