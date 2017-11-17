const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START_STYLE,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_OPEN_TAG_END_STYLE,
  TOKEN_STYLE_TAG_CONTENT,
  TOKEN_CLOSE_TAG_STYLE,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TAG,
  NODE_TEXT,
  NODE_STYLE
} = require('../../../../lib/constants/ast-nodes')

module.exports = {
  nodeType: NODE_DOCUMENT,
  content: {
    children: [
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 0,
            endPosition: 0
          }
        }
      },
      {
        nodeType: NODE_STYLE,
        content: {
          openStart: {
            type: TOKEN_OPEN_TAG_START_STYLE,
            content: '<style',
            startPosition: 1,
            endPosition: 6
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END_STYLE,
            content: '>',
            startPosition: 7,
            endPosition: 7
          },
          value: {
            type: TOKEN_STYLE_TAG_CONTENT,
            content: '\n  body {\n    background-color: red;\n  }\n',
            startPosition: 8,
            endPosition: 48
          },
          close: {
            type: TOKEN_CLOSE_TAG_STYLE,
            content: '</style>',
            startPosition: 49,
            endPosition: 56
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 57,
            endPosition: 58
          }
        }
      },
      {
        nodeType: NODE_TAG,
        content: {
          name: 'div',
          selfClosing: false,
          openStart: {
            type: TOKEN_OPEN_TAG_START,
            content: '<div',
            startPosition: 59,
            endPosition: 62
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 63,
            endPosition: 63
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n  test\n  \n  ',
                  startPosition: 64,
                  endPosition: 76
                }
              }
            },
            {
              nodeType: NODE_STYLE,
              content: {
                openStart: {
                  type: TOKEN_OPEN_TAG_START_STYLE,
                  content: '<style',
                  startPosition: 77,
                  endPosition: 82
                },
                attributes: [
                  {
                    key: {
                      type: TOKEN_ATTRIBUTE_KEY,
                      content: 'type',
                      startPosition: 84,
                      endPosition: 87
                    },
                    startWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                      content: '"',
                      startPosition: 89,
                      endPosition: 89
                    },
                    value: {
                      type: TOKEN_ATTRIBUTE_VALUE,
                      content: 'text/css',
                      startPosition: 90,
                      endPosition: 97
                    },
                    endWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                      content: '"',
                      startPosition: 98,
                      endPosition: 98
                    }
                  },
                  {
                    key: {
                      type: TOKEN_ATTRIBUTE_KEY,
                      content: 'rel',
                      startPosition: 100,
                      endPosition: 102
                    },
                    startWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                      content: '"',
                      startPosition: 104,
                      endPosition: 104
                    },
                    value: {
                      type: TOKEN_ATTRIBUTE_VALUE,
                      content: 'stylesheet',
                      startPosition: 105,
                      endPosition: 114
                    },
                    endWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                      content: '"',
                      startPosition: 115,
                      endPosition: 115
                    }
                  }
                ],
                openEnd: {
                  type: TOKEN_OPEN_TAG_END_STYLE,
                  content: '>',
                  startPosition: 116,
                  endPosition: 116
                },
                value: {
                  type: TOKEN_STYLE_TAG_CONTENT,
                  content: '\n    body {\n      background-color: white;\n    }\n  ',
                  startPosition: 117,
                  endPosition: 167
                },
                close: {
                  type: TOKEN_CLOSE_TAG_STYLE,
                  content: '</style>',
                  startPosition: 168,
                  endPosition: 175
                }
              }
            },
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n',
                  startPosition: 176,
                  endPosition: 176
                }
              }
            }
          ],
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</div>',
            startPosition: 177,
            endPosition: 182
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 183,
            endPosition: 184
          }
        }
      },
      {
        nodeType: NODE_STYLE,
        content: {
          openStart: {
            type: TOKEN_OPEN_TAG_START_STYLE,
            content: '<style',
            startPosition: 185,
            endPosition: 190
          },
          attributes: [
            {
              key: {
                type: TOKEN_ATTRIBUTE_KEY,
                content: 'type',
                startPosition: 192,
                endPosition: 195
              },
              startWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                content: '"',
                startPosition: 197,
                endPosition: 197
              },
              value: {
                type: TOKEN_ATTRIBUTE_VALUE,
                content: 'text/css',
                startPosition: 198,
                endPosition: 205
              },
              endWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                content: '"',
                startPosition: 206,
                endPosition: 206
              }
            },
            {
              key: {
                type: TOKEN_ATTRIBUTE_KEY,
                content: 'rel',
                startPosition: 208,
                endPosition: 210
              },
              startWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                content: '"',
                startPosition: 212,
                endPosition: 212
              },
              value: {
                type: TOKEN_ATTRIBUTE_VALUE,
                content: 'stylesheet',
                startPosition: 213,
                endPosition: 222
              },
              endWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                content: '"',
                startPosition: 223,
                endPosition: 223
              }
            }
          ],
          openEnd: {
            type: TOKEN_OPEN_TAG_END_STYLE,
            content: '>',
            startPosition: 224,
            endPosition: 224
          },
          value: {
            type: TOKEN_STYLE_TAG_CONTENT,
            content: '\n  body {\n    background-color: black;\n  }\n',
            startPosition: 225,
            endPosition: 267
          },
          close: {
            type: TOKEN_CLOSE_TAG_STYLE,
            content: '</style>',
            startPosition: 268,
            endPosition: 275
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 276,
            endPosition: 276
          }
        }
      }
    ]
  }
}
