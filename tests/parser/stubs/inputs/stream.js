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
      content: "<div",
      startPosition: 309,
      endPosition: 402
    },
    {
      type: TOKEN_ATTRIBUTE_KEY,
      content: "class",
      startPosition: 404,
      endPosition: 408
    },
    {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: "=",
      startPosition: 409,
      endPosition: 409
    },
  ],
  [
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: "'",
      startPosition: 410,
      endPosition: 410
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: "apostrophe-class",
      startPosition: 411,
      endPosition: 424
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: "'",
      startPosition: 425,
      endPosition: 425
    },
    {
      type: TOKEN_ATTRIBUTE_KEY,
      content: "custom-attr",
      startPosition: 426,
      endPosition: 437
    },
    {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: "=",
      startPosition: 438,
      endPosition: 438
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: "attr-value",
      startPosition: 439,
      endPosition: 448
    },
  ],
  [
    {
      type: TOKEN_OPEN_TAG_END,
      content: ">",
      startPosition: 449,
      endPosition: 449
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
      content: "</div>",
      startPosition: 379,
      endPosition: 383
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
      content: "<div",
      startPosition: 410,
      endPosition: 413
    },
    {
      type: TOKEN_OPEN_TAG_END,
      content: ">",
      startPosition: 414,
      endPosition: 414
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
      content: "<some-component",
      startPosition: 516,
      endPosition: 528
    },
    {
      type: TOKEN_ATTRIBUTE_ASSIGNMENT,
      content: "=",
      startPosition: 529,
      endPosition: 529
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: "\"",
      startPosition: 530,
      endPosition: 530
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE,
      content: "some thing",
      startPosition: 531,
      endPosition: 540
    },
    {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
      content: "\"",
      startPosition: 541,
      endPosition: 541
    },
    {
      type: TOKEN_OPEN_TAG_END,
      content: ">",
      startPosition: 542,
      endPosition: 542
    },
    {
      type: TOKEN_CLOSE_TAG,
      content: "</some-component>",
      startPosition: 543,
      endPosition: 562
    },
  ],
  [
    {
      type: TOKEN_CLOSE_TAG,
      content: "</div>",
      startPosition: 567,
      endPosition: 570
    }
  ]
]
