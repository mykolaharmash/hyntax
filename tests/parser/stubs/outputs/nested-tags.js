const {
  TOKEN_TEXT,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')
const {
  TAG_CONTENT_CONTEXT,
  TAG_CONTEXT,
  TAG_NAME_CONTEXT
} = require('../../../../lib/constants/parser-contexts')

module.exports = {
  type: TAG_CONTENT_CONTEXT,
  content: [
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
              content: '\n  ',
              startPosition: 5,
              endPosition: 7
            },
            {
              type: TAG_CONTEXT,
              content: [
                {
                  type: TAG_NAME_CONTEXT,
                  content: 'span'
                },
                {
                  type: TAG_CONTENT_CONTEXT,
                  content: [
                    {
                      type: TOKEN_TEXT,
                      content: '\n    some text\n\n    ',
                      startPosition: 14,
                      endPosition: 33
                    },
                    {
                      type: TAG_CONTEXT,
                      content: [
                        {
                          type: TAG_NAME_CONTEXT,
                          content: 'span'
                        },
                        {
                          type: TAG_CONTENT_CONTEXT,
                          content: [
                            {
                              type: TOKEN_TEXT,
                              content: '\n      another text\n    ',
                              startPosition: 40,
                              endPosition: 63
                            }
                          ]
                        },
                        {
                          type: TOKEN_CLOSE_TAG,
                          content: '</span>'
                        }
                      ]
                    },
                    {
                      type: TOKEN_TEXT,
                      content: '\n  ',
                      startPosition: 71,
                      endPosition: 73
                    }
                  ]
                },
                {
                  type: TOKEN_CLOSE_TAG,
                  content: '</span>'
                }
              ]
            },
            {
              type: TOKEN_TEXT,
              content: '\n',
              startPosition: 81,
              endPosition: 81
            }
          ]
        },
        {
          type: TOKEN_CLOSE_TAG,
          content: '</div>'
        }
      ]
    },
    {
      type: TOKEN_TEXT,
      content: '\n',
      startPosition: 88,
      endPosition: 88
    }
  ]
}
