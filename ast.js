let ast = {
  type: 'root',
  content: [
    {
      type: 'text',
      content: [
        { type: 'text', content: 'st\n\n' }
      ]
    },
    {
      type: 'tag',
      content: [
        {
          type: 'tag-name',
          content: 'div'
        },
        {
          type: 'tag-attributes',
          content: [
            {
              type: 'attribute-item',
              content: [
                {
                  type: 'attribute-item-key',
                  content: [
                    { type: 'attribute-key', content: 'class' }
                  ]
                },
                {
                  type: 'attribute-item-value',
                  content: [
                    { type: 'attribute-value-quoted', content: 'some class' }
                  ]
                }
              ]
            },
            {
              type: 'attribute-item',
              content: [
                {
                  type: 'attribute-item-key',
                  content: [
                    { type: 'attribute-key', content: 'disabled' }
                  ]
                }
              ]
            },
            {
              type: 'attribute-item',
              content: [
                {
                  type: 'attribute-item-key',
                  content: [
                    { type: 'attribute-key', content: 'custom' }
                  ]
                },
                {
                  type: 'attribute-item-value',
                  content: [
                    { type: 'attribute-value-quoted', content: 'attri>bute' }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'tag-content',
          content: [
            { type: 'text', content: '\n\n  rsdjfkl < jsdfljdsf\n\n  ' },
            {
              type: 'tag',
              name: 'some-component',
              content: [
                {
                  type: 'tag-attributes',
                  content: [

                  ]
                }

              ]
            }
          ]
        }
      ]
    }
  ]
}

let tokens = [
  { type: 'text', content: 'st\n\n' },
  { type: 'open-tag-start', content: '<div' },
  { type: 'attribute-key', content: 'class' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'some class' },
  { type: 'attribute-value-end-quote', content: '"' },
  { type: 'attribute-key', content: 'disabled' },
  { type: 'attribute-key', content: 'custom' },
  { type: 'attribute-assignment', content: '=' },
  { type: 'attribute-value-start-quote', content: '"' },
  { type: 'attribute-value-quoted', content: 'attri>bute' },
  { type: 'attribute-value-end-quote', content: '"' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '\n\n  rsdjfkl < jsdfljdsf\n\n  ' },
  { type: 'open-tag-start', content: '<some-component' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '' },
  { type: 'close-tag', content: '</some-component>' },
  { type: 'text', content: '\n\n  ' },
  { type: 'open-tag-start', content: '<br' },
  { type: 'open-tag-end', content: '>' },
  { type: 'text', content: '\n\n  ' },
  { type: 'open-tag-start', content: '<img' },
  { type: 'open-tag-end', content: '/>' },
  { type: 'text', content: '\n\n  ' },
  { type: 'open-tag-start', content: '<span' },
  { type: 'open-tag-end', content: '>' },
  {
    type: 'text',
    content: 'sldflksdjf sldfjlsdkjf sdlkfjdslkfj '
  },
  { type: 'close-tag', content: '</span>' },
  { type: 'text', content: '\n\n  sdlkfjklsdfj\n\n' }
]
