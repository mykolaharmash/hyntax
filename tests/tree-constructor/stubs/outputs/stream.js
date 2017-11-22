const {
  TOKEN_TEXT,
  TOKEN_CLOSE_TAG,
  TOKEN_OPEN_TAG_START,
  TOKEN_COMMENT_START,
  TOKEN_COMMENT_END,
  TOKEN_COMMENT_CONTENT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_OPEN_TAG_END
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TEXT,
  NODE_TAG,
  NODE_COMMENT
} = require('../../../../lib/constants/ast-nodes')

module.exports = {
  nodeType: NODE_DOCUMENT,
  content: {
    children: [
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            'type': TOKEN_TEXT,
            'content': '\ntest\n\n',
            'startPosition': 0,
            'endPosition': 6
          }
        }
      },
      {
        nodeType: NODE_TAG,
        content: {
          name: 'div',
          selfClosing: false,
          openStart: {
            'type': TOKEN_OPEN_TAG_START,
            'content': '<div',
            'startPosition': 7,
            'endPosition': 10
          },
          attributes: [
            {
              key: {
                'type': TOKEN_ATTRIBUTE_KEY,
                'content': 'class',
                'startPosition': 12,
                'endPosition': 16
              },
              startWrapper: {
                'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                'content': '\'',
                'startPosition': 18,
                'endPosition': 18
              },
              value: {
                'type': TOKEN_ATTRIBUTE_VALUE,
                'content': 'apostrophe-class',
                'startPosition': 19,
                'endPosition': 34
              },
              endWrapper: {
                'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                'content': '\'',
                'startPosition': 35,
                'endPosition': 35
              }
            },
            {
              key: {
                'type': TOKEN_ATTRIBUTE_KEY,
                'content': 'custom-attr',
                'startPosition': 37,
                'endPosition': 47
              },
              value: {
                'type': TOKEN_ATTRIBUTE_VALUE,
                'content': 'attr-value',
                'startPosition': 49,
                'endPosition': 58
              }
            }
          ],
          openEnd: {
            'type': TOKEN_OPEN_TAG_END,
            'content': '>',
            'startPosition': 59,
            'endPosition': 59
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  'type': TOKEN_TEXT,
                  'content': '\n  some content\n',
                  'startPosition': 60,
                  'endPosition': 75
                }
              }
            }
          ],
          close: {
            'type': TOKEN_CLOSE_TAG,
            'content': '</div>',
            'startPosition': 76,
            'endPosition': 81
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            'type': TOKEN_TEXT,
            'content': '\n\n',
            'startPosition': 82,
            'endPosition': 83
          }
        }
      },
      {
        nodeType: NODE_COMMENT,
        content: {
          start: {
            'type': TOKEN_COMMENT_START,
            'content': '<!--',
            'startPosition': 84,
            'endPosition': 87
          },
          value: {
            'type': TOKEN_COMMENT_CONTENT,
            'content': ' test comment  ',
            'startPosition': 88,
            'endPosition': 102
          },
          end: {
            'type': TOKEN_COMMENT_END,
            'content': '-->',
            'startPosition': 103,
            'endPosition': 105
          }
        }
      },
      {
        nodeType: NODE_TAG,
        content: {
          name: 'div',
          selfClosing: false,
          openStart: {
            'type': TOKEN_OPEN_TAG_START,
            'content': '<div',
            'startPosition': 108,
            'endPosition': 111
          },
          openEnd: {
            'type': TOKEN_OPEN_TAG_END,
            'content': '>',
            'startPosition': 112,
            'endPosition': 112
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  'type': TOKEN_TEXT,
                  'content': '\n  rsdjfkl < jsdfljdsf\n  \n  ',
                  'startPosition': 113,
                  'endPosition': 140
                }
              }
            },
            {
              nodeType: NODE_TAG,
              content: {
                name: 'some-component',
                selfClosing: false,
                openStart: {
                  'type': TOKEN_OPEN_TAG_START,
                  'content': '<some-component',
                  'startPosition': 141,
                  'endPosition': 155
                },
                attributes: [
                  {
                    startWrapper: {
                      'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                      'content': '"',
                      'startPosition': 158,
                      'endPosition': 158
                    },
                    value: {
                      'type': TOKEN_ATTRIBUTE_VALUE,
                      'content': 'some-thing',
                      'startPosition': 159,
                      'endPosition': 168
                    },
                    endWrapper: {
                      'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                      'content': '"',
                      'startPosition': 169,
                      'endPosition': 169
                    }
                  }
                ],
                openEnd: {
                  'type': TOKEN_OPEN_TAG_END,
                  'content': '>',
                  'startPosition': 170,
                  'endPosition': 170
                },
                close: {
                  'type': TOKEN_CLOSE_TAG,
                  'content': '</some-component>',
                  'startPosition': 171,
                  'endPosition': 187
                }
              }
            },
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  'type': TOKEN_TEXT,
                  'content': '\n',
                  'startPosition': 188,
                  'endPosition': 188
                }
              }
            }
          ],
          close: {
            'type': TOKEN_CLOSE_TAG,
            'content': '</div>',
            'startPosition': 189,
            'endPosition': 194
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            'type': TOKEN_TEXT,
            'content': '\n\n',
            'startPosition': 195,
            'endPosition': 196
          }
        }
      }
    ]
  }
}
