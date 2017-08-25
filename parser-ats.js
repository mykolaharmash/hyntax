let a = {
  parentRef: undefined,
  type: 'tag-content',
  content:
    [
      { type: 'text', content: 'st\n\n' },
      {
        parentRef: [Circular],
        type: 'tag',
        content:
          [
            {
              parentRef: [Circular],
              type: 'tag-name',
              content: [{ type: 'open-tag-start', content: '<div' }]
            },
            {
              parentRef: [Circular],
              type: 'attributes',
              content:
                [
                  {
                    parentRef: [Circular],
                    type: 'attribute',
                    content:
                      [
                        { type: 'attribute-key', content: 'class' },
                        {
                          parentRef: [Circular],
                          type: 'attribute-value',
                          content:
                            [
                              {
                                type: 'attribute-value-apostrophe',
                                content: 'apostrophe-class'
                              }
                            ]
                        }
                      ]
                  }
                ]
            },
            {
              parentRef: [Circular],
              type: 'tag-content',
              content: [{ type: 'text', content: '\n  some content\n' }]
            }
          ]
      },
      { type: 'text', content: '\n\n' },
      {
        parentRef: [Circular],
        type: 'tag',
        content:
          [
            {
              parentRef: [Circular],
              type: 'tag-name',
              content: [{ type: 'open-tag-start', content: '<div' }]
            },
            {
              parentRef: [Circular],
              type: 'attributes',
              content:
                [
                  {
                    parentRef: [Circular],
                    type: 'attribute',
                    content: [{ type: 'attribute-key', content: '"-test"' }]
                  },
                  {
                    parentRef: [Circular],
                    type: 'attribute',
                    content:
                      [
                        { type: 'attribute-key', content: 'class' },
                        {
                          parentRef: [Circular],
                          type: 'attribute-value',
                          content: [
                            {
                              type: 'attribute-value-quoted',
                              content: 'some class'
                            }
                          ]
                        },
                        {
                          parentRef: [Circular],
                          type: 'attribute-value',
                          content: [
                            {
                              type: 'attribute-value-quoted',
                              content: 'some more'
                            }
                          ]
                        }
                      ]
                  },
                  {
                    parentRef: [Circular],
                    type: 'attribute',
                    content: [{ type: 'attribute-key', content: 'disabled' }]
                  },
                  {
                    parentRef: [Circular],
                    type: 'attribute',
                    content:
                      [
                        { type: 'attribute-key', content: 'custom' },
                        {
                          parentRef: [Circular],
                          type: 'attribute-value',
                          content: [
                            {
                              type: 'attribute-value-quoted',
                              content: 'attri>bute'
                            }
                          ]
                        }
                      ]
                  }
                ]
            },
            {
              parentRef: [Circular],
              type: 'tag-content',
              content:
                [
                  { type: 'text', content: '\n\n  rsdjfkl < jsdfljdsf\n\n  ' },
                  {
                    parentRef: [Circular],
                    type: 'tag',
                    content:
                      [
                        {
                          parentRef: [Circular],
                          type: 'tag-name',
                          content: [
                            {
                              type: 'open-tag-start',
                              content: '<some-component'
                            }
                          ]
                        },
                        {
                          parentRef: [Circular],
                          type: 'attributes',
                          content:
                            [
                              {
                                parentRef: [Circular],
                                type: 'attribute',
                                content:
                                  [
                                    {
                                      parentRef: [Circular],
                                      type: 'attribute-value',
                                      content: [
                                        {
                                          type: 'attribute-value-quoted',
                                          content: 'some thing'
                                        }
                                      ]
                                    }
                                  ]
                              }
                            ]
                        },
                        {
                          parentRef: [Circular],
                          type: 'tag-content',
                          content: [{ type: 'text', content: '' }]
                        }
                      ]
                  },
                  { type: 'text', content: '\n\n  ' },
                  {
                    parentRef: [Circular],
                    type: 'tag',
                    content:
                      [
                        {
                          parentRef: [Circular],
                          type: 'tag-name',
                          content: [{ type: 'open-tag-start', content: '<br' }]
                        }
                      ]
                  },
                  { type: 'text', content: '\n\n  ' },
                  {
                    parentRef: [Circular],
                    type: 'tag',
                    content:
                      [
                        {
                          parentRef: [Circular],
                          type: 'tag-name',
                          content: [{ type: 'open-tag-start', content: '<img' }]
                        }
                      ]
                  },
                  { type: 'text', content: '\n\n  ' },
                  {
                    parentRef: [Circular],
                    type: 'tag',
                    content:
                      [
                        {
                          parentRef: [Circular],
                          type: 'tag-name',
                          content: [
                            {
                              type: 'open-tag-start',
                              content: '<span'
                            }
                          ]
                        },
                        {
                          parentRef: [Circular],
                          type: 'tag-content',
                          content:
                            [
                              {
                                type: 'text',
                                content: 'sldflksdjf sldfjlsdkjf sdlkfjdslkfj '
                              }
                            ]
                        }
                      ]
                  },
                  { type: 'text', content: '\n\n  sdlkfjklsdfj\n\n' }
                ]
            }
          ]
      }
    ]
}
