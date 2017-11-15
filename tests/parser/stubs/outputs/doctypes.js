const {
  TOKEN_TEXT,
  TOKEN_DOCTYPE_START,
  TOKEN_DOCTYPE_END,
  TOKEN_DOCTYPE_ATTRIBUTE,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
  TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TEXT,
  NODE_DOCTYPE
} = require('../../../../lib/constants/ast-nodes')

module.exports = {
  nodeType: NODE_DOCUMENT,
  content: {
    children: [
      {
        nodeType: NODE_DOCTYPE,
        content: {
          start: {
            type: TOKEN_DOCTYPE_START,
            content: '<!DOCTYPE',
            startPosition: 0,
            endPosition: 8
          },
          end: {
            type: TOKEN_DOCTYPE_END,
            content: '>',
            startPosition: 9,
            endPosition: 9
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 10,
            endPosition: 11
          }
        }
      },
      {
        nodeType: NODE_DOCTYPE,
        content: {
          start: {
            type: TOKEN_DOCTYPE_START,
            content: '<!DOCTYPE',
            startPosition: 24,
            endPosition: 32
          },
          attributes: [
            {
              startWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
                content: '"',
                startPosition: 34,
                endPosition: 34
              },
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'some attribute',
                startPosition: 35,
                endPosition: 48
              },
              endWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
                content: '"',
                startPosition: 49,
                endPosition: 49
              }
            },
            {
              startWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
                content: '\'',
                startPosition: 51,
                endPosition: 51
              },
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'another-one',
                startPosition: 52,
                endPosition: 62
              },
              endWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
                content: '\'',
                startPosition: 63,
                endPosition: 63
              }
            }
          ],
          end: {
            type: TOKEN_DOCTYPE_END,
            content: '>',
            startPosition: 65,
            endPosition: 65
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 66,
            endPosition: 67
          }
        }
      },
      {
        nodeType: NODE_DOCTYPE,
        content: {
          start: {
            type: TOKEN_DOCTYPE_START,
            content: '<!DOCTYPE',
            startPosition: 68,
            endPosition: 76
          },
          attributes: [
            {
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'html',
                startPosition: 78,
                endPosition: 81
              }
            },
            {
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'PUBLIC',
                startPosition: 83,
                endPosition: 88
              }
            }
          ],
          end: {
            type: TOKEN_DOCTYPE_END,
            content: '>',
            startPosition: 89,
            endPosition: 89
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 90,
            endPosition: 91
          }
        }
      },
      {
        nodeType: NODE_DOCTYPE,
        content: {
          start: {
            type: TOKEN_DOCTYPE_START,
            content: '<!DOCTYPE',
            startPosition: 92,
            endPosition: 100
          },
          attributes: [
            {
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'HTML',
                startPosition: 102,
                endPosition: 105
              }
            },
            {
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'PUBLIC',
                startPosition: 107,
                endPosition: 112
              }
            },
            {
              startWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
                content: '"',
                startPosition: 114,
                endPosition: 114
              },
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: '-//W3C//DTD HTML 4.01 Frameset//EN',
                startPosition: 115,
                endPosition: 148
              },
              endWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
                content: '"',
                startPosition: 149,
                endPosition: 149
              }
            },
            {
              startWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_START,
                content: '"',
                startPosition: 151,
                endPosition: 151
              },
              value: {
                type: TOKEN_DOCTYPE_ATTRIBUTE,
                content: 'http://www.w3.org/TR/html4/frameset.dtd',
                startPosition: 152,
                endPosition: 190
              },
              endWrapper: {
                type: TOKEN_DOCTYPE_ATTRIBUTE_WRAPPER_END,
                content: '"',
                startPosition: 191,
                endPosition: 191
              }
            }
          ],
          end: {
            type: TOKEN_DOCTYPE_END,
            content: '>',
            startPosition: 192,
            endPosition: 192
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 303,
            endPosition: 303
          }
        }
      }
    ]
  }
}
