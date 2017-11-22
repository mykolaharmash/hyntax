const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START_SCRIPT,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_OPEN_TAG_END_SCRIPT,
  TOKEN_SCRIPT_TAG_CONTENT,
  TOKEN_CLOSE_TAG_SCRIPT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TAG,
  NODE_TEXT,
  NODE_SCRIPT
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
        nodeType: NODE_SCRIPT,
        content: {
          openStart: {
            type: TOKEN_OPEN_TAG_START_SCRIPT,
            content: '<script',
            startPosition: 1,
            endPosition: 7
          },
          attributes: [
            {
              key: {
                type: TOKEN_ATTRIBUTE_KEY,
                content: 'src',
                startPosition: 9,
                endPosition: 11
              },
              startWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                content: '"',
                startPosition: 13,
                endPosition: 13
              },
              value: {
                type: TOKEN_ATTRIBUTE_VALUE,
                content: './some/script.js',
                startPosition: 14,
                endPosition: 29
              },
              endWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                content: '"',
                startPosition: 30,
                endPosition: 30
              }
            },
            {
              key: {
                type: TOKEN_ATTRIBUTE_KEY,
                content: 'async',
                startPosition: 32,
                endPosition: 36
              }
            }
          ],
          openEnd: {
            type: TOKEN_OPEN_TAG_END_SCRIPT,
            content: '>',
            startPosition: 37,
            endPosition: 37
          },
          value: {
            type: TOKEN_SCRIPT_TAG_CONTENT,
            content: '',
            startPosition: 38,
            endPosition: 37
          },
          close: {
            type: TOKEN_CLOSE_TAG_SCRIPT,
            content: '</script>',
            startPosition: 38,
            endPosition: 46
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 47,
            endPosition: 48
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
            startPosition: 49,
            endPosition: 52
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 53,
            endPosition: 53
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n  test\n  \n  ',
                  startPosition: 54,
                  endPosition: 66
                }
              }
            },
            {
              nodeType: NODE_SCRIPT,
              content: {
                openStart: {
                  type: TOKEN_OPEN_TAG_START_SCRIPT,
                  content: '<script',
                  startPosition: 67,
                  endPosition: 73
                },
                attributes: [
                  {
                    key: {
                      type: TOKEN_ATTRIBUTE_KEY,
                      content: 'type',
                      startPosition: 75,
                      endPosition: 78
                    },
                    startWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                      content: '"',
                      startPosition: 80,
                      endPosition: 80
                    },
                    value: {
                      type: TOKEN_ATTRIBUTE_VALUE,
                      content: 'text/javascript',
                      startPosition: 81,
                      endPosition: 95
                    },
                    endWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                      content: '"',
                      startPosition: 96,
                      endPosition: 96
                    }
                  }
                ],
                openEnd: {
                  type: TOKEN_OPEN_TAG_END_SCRIPT,
                  content: '>',
                  startPosition: 97,
                  endPosition: 97
                },
                value: {
                  type: TOKEN_SCRIPT_TAG_CONTENT,
                  content: '\n    console.log(\'hello!\') \n  ',
                  startPosition: 98,
                  endPosition: 127
                },
                close: {
                  type: TOKEN_CLOSE_TAG_SCRIPT,
                  content: '</script>',
                  startPosition: 128,
                  endPosition: 136
                }
              }
            },
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n',
                  startPosition: 137,
                  endPosition: 137
                }
              }
            }
          ],
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</div>',
            startPosition: 138,
            endPosition: 143
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 144,
            endPosition: 145
          }
        }
      },
      {
        nodeType: NODE_SCRIPT,
        content: {
          openStart: {
            type: TOKEN_OPEN_TAG_START_SCRIPT,
            content: '<script',
            startPosition: 146,
            endPosition: 152
          },
          attributes: [
            {
              key: {
                type: TOKEN_ATTRIBUTE_KEY,
                content: 'type',
                startPosition: 154,
                endPosition: 157
              },
              startWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                content: '"',
                startPosition: 159,
                endPosition: 159
              },
              value: {
                type: TOKEN_ATTRIBUTE_VALUE,
                content: 'text/javascript',
                startPosition: 160,
                endPosition: 174
              },
              endWrapper: {
                type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                content: '"',
                startPosition: 175,
                endPosition: 175
              }
            }
          ],
          openEnd: {
            type: TOKEN_OPEN_TAG_END_SCRIPT,
            content: '>',
            startPosition: 176,
            endPosition: 176
          },
          value: {
            type: TOKEN_SCRIPT_TAG_CONTENT,
            content: '\n  console.log(\'another hello!\') \n',
            startPosition: 177,
            endPosition: 210
          },
          close: {
            type: TOKEN_CLOSE_TAG_SCRIPT,
            content: '</script>',
            startPosition: 211,
            endPosition: 219
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 220,
            endPosition: 220
          }
        }
      }
    ]
  }
}
