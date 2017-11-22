const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_COMMENT_START,
  TOKEN_COMMENT_CONTENT,
  TOKEN_COMMENT_END
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TAG,
  NODE_TEXT,
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
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 0,
            endPosition: 0
          }
        }
      },
      {
        nodeType: NODE_COMMENT,
        content: {
          start: {
            type: TOKEN_COMMENT_START,
            content: '<!--',
            startPosition: 1,
            endPosition: 4
          },
          value: {
            type: TOKEN_COMMENT_CONTENT,
            content: ' start comment ',
            startPosition: 5,
            endPosition: 19
          },
          end: {
            type: TOKEN_COMMENT_END,
            content: '-->',
            startPosition: 20,
            endPosition: 22
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 23,
            endPosition: 24
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
            startPosition: 25,
            endPosition: 28
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 29,
            endPosition: 29
          },
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n  ',
                  startPosition: 30,
                  endPosition: 32
                }
              }
            },
            {
              nodeType: NODE_COMMENT,
              content: {
                start: {
                  type: TOKEN_COMMENT_START,
                  content: '<!--',
                  startPosition: 33,
                  endPosition: 36
                },
                value: {
                  type: TOKEN_COMMENT_CONTENT,
                  content: ' \n    nested \n    comment \n   ',
                  startPosition: 37,
                  endPosition: 66
                },
                end: {
                  type: TOKEN_COMMENT_END,
                  content: '-->',
                  startPosition: 67,
                  endPosition: 69
                }
              }
            },
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n',
                  startPosition: 70,
                  endPosition: 70
                }
              }
            }
          ],
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</div>',
            startPosition: 71,
            endPosition: 76
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n\n',
            startPosition: 77,
            endPosition: 78
          }
        }
      },
      {
        nodeType: NODE_COMMENT,
        content: {
          start: {
            type: TOKEN_COMMENT_START,
            content: '<!--',
            startPosition: 79,
            endPosition: 82
          },
          value: {
            type: TOKEN_COMMENT_CONTENT,
            content: ' end comment ',
            startPosition: 83,
            endPosition: 95
          },
          end: {
            type: TOKEN_COMMENT_END,
            content: '-->',
            startPosition: 96,
            endPosition: 98
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 99,
            endPosition: 99
          }
        }
      }
    ]
  }
}
