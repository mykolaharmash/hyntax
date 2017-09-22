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
    content: '<div'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: 'some thing',
    startPosition: 5,
    endPosition: 14
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<some-component'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: 'another thing',
    startPosition: 37,
    endPosition: 49
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</some-component>'
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div'
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'some'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'attribute goes here'
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    content: '"'
  },
  {
    type: TOKEN_ATTRIBUTE_KEY,
    content: 'and'
  },
  {
    type: TOKEN_ATTRIBUTE_ASSIGNMENT,
    content: '='
  },
  {
    type: TOKEN_ATTRIBUTE_VALUE,
    content: 'here'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_TEXT,
    content: 'more content',
    startPosition: 108,
    endPosition: 119
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: 'closing text',
    startPosition: 126,
    endPosition: 137
  }
]
