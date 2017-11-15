const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_ATTRIBUTE_VALUE
} = require('../../../../lib/constants/token-types')

const {
  NODE_DOCUMENT,
  NODE_TAG,
  NODE_TEXT
} = require('../../../../lib/constants/ast-nodes')

module.exports = {
  nodeType: NODE_DOCUMENT,
  content: {
    children: [
      {
        nodeType: NODE_TAG,
        content: {
          name: 'div',
          openStart: {
            type: TOKEN_OPEN_TAG_START,
            content: '<div',
            startPosition: 0,
            endPosition: 3
          },
          openEnd: {
            type: TOKEN_OPEN_TAG_END,
            content: '>',
            startPosition: 4,
            endPosition: 4
          },
          selfClosing: false,
          children: [
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n  ',
                  startPosition: 5,
                  endPosition: 7
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
                  startPosition: 8,
                  endPosition: 11
                },
                attributes: [
                  {
                    key: {
                      type: TOKEN_ATTRIBUTE_KEY,
                      content: 'class',
                      startPosition: 14,
                      endPosition: 18
                    },
                    value: {
                      type: TOKEN_ATTRIBUTE_VALUE,
                      content: 'test class',
                      startPosition: 21,
                      endPosition: 30
                    },
                    startWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
                      content: '"',
                      startPosition: 20,
                      endPosition: 20
                    },
                    endWrapper: {
                      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
                      content: '"',
                      startPosition: 31,
                      endPosition: 31
                    }
                  },
                  {
                    key: {
                      type: TOKEN_ATTRIBUTE_KEY,
                      content: 'disabled',
                      startPosition: 33,
                      endPosition: 41
                    }
                  }
                ],
                openEnd: {
                  type: TOKEN_OPEN_TAG_END,
                  content: '>',
                  startPosition: 12,
                  endPosition: 12
                },
                children: [
                  {
                    nodeType: NODE_TEXT,
                    content: {
                      value: {
                        type: TOKEN_TEXT,
                        content: '\n    some text\n\n    ',
                        startPosition: 14,
                        endPosition: 33
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
                        startPosition: 34,
                        endPosition: 37
                      },
                      openEnd: {
                        type: TOKEN_OPEN_TAG_END,
                        content: '>',
                        startPosition: 38,
                        endPosition: 38
                      },
                      children: [
                        {
                          nodeType: NODE_TEXT,
                          content: {
                            value: {
                              type: TOKEN_TEXT,
                              content: '\n      another text\n    ',
                              startPosition: 40,
                              endPosition: 63
                            }
                          }
                        }
                      ],
                      close: {
                        type: TOKEN_CLOSE_TAG,
                        content: '</span>',
                        startPosition: 64,
                        endPosition: 68
                      }
                    }
                  },
                  {
                    nodeType: NODE_TEXT,
                    content: {
                      value: {
                        type: TOKEN_TEXT,
                        content: '\n  ',
                        startPosition: 71,
                        endPosition: 73
                      }
                    }
                  }
                ],
                close: {
                  type: TOKEN_CLOSE_TAG,
                  content: '</span>',
                  startPosition: 74,
                  endPosition: 78
                }
              }
            },
            {
              nodeType: NODE_TEXT,
              content: {
                value: {
                  type: TOKEN_TEXT,
                  content: '\n',
                  startPosition: 81,
                  endPosition: 81
                }
              }
            }
          ],
          close: {
            type: TOKEN_CLOSE_TAG,
            content: '</div>',
            startPosition: 82,
            endPosition: 85
          }
        }
      },
      {
        nodeType: NODE_TEXT,
        content: {
          value: {
            type: TOKEN_TEXT,
            content: '\n',
            startPosition: 88,
            endPosition: 88
          }
        }
      }
    ]
  }
}
