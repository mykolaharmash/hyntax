const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TEXT,
  NODE_TAG
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
        nodeType: NODE_TAG,
        content: {
          name: 'div',
          selfClosing: false,
          openStart: {
            type: TOKEN_OPEN_TAG_START,
            content: '<div',
            startPosition: 1,
            endPosition: 4
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 5,
            endPosition: 5
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n',
                  startPosition: 6,
                  endPosition: 6
                }
              }
            }
          ],
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</DIV>',
            startPosition: 7,
            endPosition: 12
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 13,
            endPosition: 14
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
            content: '<DIV',
            startPosition: 15,
            endPosition: 18
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 19,
            endPosition: 19
          },
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</div>',
            startPosition: 20,
            endPosition: 25
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 26,
            endPosition: 27
          }
        }
      },
      {
        nodeType: NODE_TAG,
        content: {
          name: 'span',
          selfClosing: false,
          openStart: {
            type: TOKEN_OPEN_TAG_START,
            content: '<span',
            startPosition: 28,
            endPosition: 32
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 33,
            endPosition: 33
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n',
                  startPosition: 34,
                  endPosition: 34
                }
              }
            }
          ],
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</span>',
            startPosition: 35,
            endPosition: 41
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 42,
            endPosition: 43
          }
        }
      },
      {
        nodeType: NODE_TAG,
        content: {
          name: 'span',
          selfClosing: false,
          openStart: {
            type: TOKEN_OPEN_TAG_START,
            content: '<SPAN',
            startPosition: 44,
            endPosition: 48
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 49,
            endPosition: 49
          },
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</SPAN>',
            startPosition: 50,
            endPosition: 56
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 57,
            endPosition: 57
          }
        }
      }
    ]
  }
}
