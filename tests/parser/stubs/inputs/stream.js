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

module.exports = [
  [
    {
      type: TOKEN_TEXT,
      content: "\n\nst\n\n",
      startPosition: 303,
      endPosition: 308
    },
  ],
  [
    {
      type: TOKEN_OPEN_TAG_START,
      content: "<div"
    },
    {
      type: TOKEN_ATTRIBUTE_KEY,
      content: "class"
    },
    {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: "="
    },
  ],
  [
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: "'"
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: "apostrophe-class"
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: "'"
    },
    {
      type: TOKEN_ATTRIBUTE_KEY,
      content: "custom-attr"
    },
    {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: "="
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: "attr-value"
    },
  ],
  [
    {
      type: TOKEN_OPEN_TAG_END,
      content: ">"
    }
  ],
  [
    {
      type: TOKEN_TEXT,
      content: "\n  some content\n",
      startPosition: 363,
      endPosition: 378
    },
    {
      type: TOKEN_CLOSE_TAG,
      content: "</div>"
    },
  ],
  [
    {
      type: TOKEN_TEXT,
      content: "\n\n",
      startPosition: 385,
      endPosition: 386
    },
    {
      type: TOKEN_COMMENT_START,
      content: "<!--",
      startPosition: 387,
      endPosition: 390
    },
    {
      type: TOKEN_COMMENT_CONTENT,
      content: " test comment ",
      startPosition: 391,
      endPosition: 404
    },
  ],
  [
    {
      type: TOKEN_COMMENT_END,
      content: "-->",
      startPosition: 405,
      endPosition: 407
    }
  ],
  [
    {
      type: TOKEN_TEXT,
      content: "\n\n",
      startPosition: 408,
      endPosition: 409
    },
    {
      type: TOKEN_OPEN_TAG_START,
      content: "<div"
    },
    {
      type: TOKEN_OPEN_TAG_END,
      content: ">"
    }
  ],
  [
    {
      type: TOKEN_TEXT,
      content: "\n\n  rsdjfkl < jsdfljdsf\n\n  ",
      startPosition: 489,
      endPosition: 515
    },
    {
      type: TOKEN_OPEN_TAG_START,
      content: "<some-component"
    },
    {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: "="
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: "\""
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: "some thing"
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: "\""
    },
    {
      type: TOKEN_OPEN_TAG_END,
      content: ">"
    },
    {
      type: TOKEN_CLOSE_TAG,
      content: "</some-component>"
    },
  ],
  [
    {
      type: TOKEN_CLOSE_TAG,
      content: "</div>"
    }
  ]
]
