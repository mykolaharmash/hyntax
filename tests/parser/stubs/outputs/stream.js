const {
  TOKEN_TEXT,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_CONTENT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_VALUE
} = require('../../../../lib/constants/token-types')

const {
  TAG_CONTENT_CONTEXT,
  TAG_CONTEXT,
  TAG_NAME_CONTEXT,
  ATTRIBUTES_CONTEXT,
  ATTRIBUTE_CONTEXT,
  ATTRIBUTE_VALUE_CONTEXT,
  COMMENT_CONTEXT
} = require('../../../../lib/constants/parser-contexts')

module.exports = {
  type: TAG_CONTENT_CONTEXT,
  content: [
    {
      type: TOKEN_TEXT,
      content: "\n\nst\n\n",
      startPosition: 303,
      endPosition: 308
    },
    {
      type: TAG_CONTEXT,
      content: [
        {
          type: TAG_NAME_CONTEXT,
          content: 'div'
        },
        {
          type: ATTRIBUTES_CONTEXT,
          content: [
            {
              type: ATTRIBUTE_CONTEXT,
              content: [
                {
                  type: TOKEN_ATTRIBUTE_KEY,
                  content: "class",
                  startPosition: 404,
                  endPosition: 408
                },
                {
                  type: ATTRIBUTE_VALUE_CONTEXT,
                  content: [
                    {
                      type: TOKEN_ATTRIBUTE_VALUE,
                      content: "apostrophe-class",
                      startPosition: 411,
                      endPosition: 424
                    }
                  ]
                }
              ]
            },
            {
              type: ATTRIBUTE_CONTEXT,
              content: [
                {
                  type: TOKEN_ATTRIBUTE_KEY,
                  content: "custom-attr",
                  startPosition: 426,
                  endPosition: 437
                },
                {
                  type: ATTRIBUTE_VALUE_CONTEXT,
                  content: [
                    {
                      type: TOKEN_ATTRIBUTE_VALUE,
                      content: "attr-value",
                      startPosition: 439,
                      endPosition: 448
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: TAG_CONTENT_CONTEXT,
          content: [
            {
              type: TOKEN_TEXT,
              content: "\n  some content\n",
              startPosition: 363,
              endPosition: 378
            },
          ]
        },
        {
          type: TOKEN_CLOSE_TAG,
          content: "</div>",
          startPosition: 379,
          endPosition: 383
        }
      ]
    },
    {
      type: TOKEN_TEXT,
      content: "\n\n",
      startPosition: 385,
      endPosition: 386
    },
    {
      type: COMMENT_CONTEXT,
      content: [
        {
          type: TOKEN_COMMENT_CONTENT,
          content: " test comment ",
          startPosition: 391,
          endPosition: 404
        }
      ]
    },
    {
      type: TOKEN_TEXT,
      content: "\n\n",
      startPosition: 408,
      endPosition: 409
    },
    {
      type: TAG_CONTEXT,
      content: [
        {
          type: TAG_NAME_CONTEXT,
          content: 'div'
        },
        {
          type: TAG_CONTENT_CONTEXT,
          content: [
            {
              type: TOKEN_TEXT,
              content: "\n\n  rsdjfkl < jsdfljdsf\n\n  ",
              startPosition: 489,
              endPosition: 515
            },
            {
              type: TAG_CONTEXT,
              content: [
                {
                  type: TAG_NAME_CONTEXT,
                  content: 'some-component'
                },
                {
                  type: ATTRIBUTES_CONTEXT,
                  content: [
                    {
                      type: ATTRIBUTE_CONTEXT,
                      content: [
                        {
                          type: ATTRIBUTE_VALUE_CONTEXT,
                          content: [
                            {
                              type: TOKEN_ATTRIBUTE_VALUE,
                              content: "some thing",
                              startPosition: 531,
                              endPosition: 540
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: TAG_CONTENT_CONTEXT,
                  content: []
                },
                {
                  type: TOKEN_CLOSE_TAG,
                  content: "</some-component>",
                  startPosition: 543,
                  endPosition: 562
                },
              ]
            }
          ]
        },
        {
          type: TOKEN_CLOSE_TAG,
          content: "</div>",
          startPosition: 567,
          endPosition: 570
        }
      ]
    }
  ]
}
