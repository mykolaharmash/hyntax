const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG,
  TOKEN_ATTRIBUTE_KEY,
  TOKEN_ATTRIBUTE_ASSIGNMENT,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
  TOKEN_ATTRIBUTE_VALUE
} = require('../../../../lib/constants/token-types')

const inputHtml = `
<div class="test">
  <custom-elem required="requered" data-some="thing"></custom-elem>
  
  <button disabled class="button" required></button>
  <button disabled required></button>
  <button 
    disabled 
    class="button disabled" 
    test="attribute"
    another="attribute"
    custom-one
  ></button>
  
  <div ='only value' 'only-key' another="attr" ="only-value-2" "only-key-2"></div>
  
  <div     ='more spaces'
    'key' spaced  =     "value" 
    "key-2"
  ></div>
</div>

<span class="another class" custom-attr></span>
`

const inputTokens = [
  {
    'type': TOKEN_TEXT,
    'content': '\n',
    'startPosition': 0,
    'endPosition': 0
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<div',
    'startPosition': 1,
    'endPosition': 4
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'class',
    'startPosition': 6,
    'endPosition': 10
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 11,
    'endPosition': 11
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 12,
    'endPosition': 12
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'test',
    'startPosition': 13,
    'endPosition': 16
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 17,
    'endPosition': 17
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 18,
    'endPosition': 18
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n  ',
    'startPosition': 19,
    'endPosition': 21
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<custom-elem',
    'startPosition': 22,
    'endPosition': 33
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'required',
    'startPosition': 35,
    'endPosition': 42
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 43,
    'endPosition': 43
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '\'',
    'startPosition': 44,
    'endPosition': 44
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'requered',
    'startPosition': 45,
    'endPosition': 52
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '\'',
    'startPosition': 53,
    'endPosition': 53
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'data-some',
    'startPosition': 55,
    'endPosition': 63
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 64,
    'endPosition': 64
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '\'',
    'startPosition': 65,
    'endPosition': 65
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'thing',
    'startPosition': 66,
    'endPosition': 70
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '\'',
    'startPosition': 71,
    'endPosition': 71
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 72,
    'endPosition': 72
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</custom-elem>',
    'startPosition': 73,
    'endPosition': 86
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n  \n  ',
    'startPosition': 87,
    'endPosition': 92
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<button',
    'startPosition': 93,
    'endPosition': 99
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'disabled',
    'startPosition': 101,
    'endPosition': 108
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'class',
    'startPosition': 110,
    'endPosition': 114
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 115,
    'endPosition': 115
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 116,
    'endPosition': 116
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'button',
    'startPosition': 117,
    'endPosition': 122
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 123,
    'endPosition': 123
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'required',
    'startPosition': 125,
    'endPosition': 132
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 133,
    'endPosition': 133
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</button>',
    'startPosition': 134,
    'endPosition': 142
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n  ',
    'startPosition': 143,
    'endPosition': 145
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<button',
    'startPosition': 146,
    'endPosition': 152
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'disabled',
    'startPosition': 154,
    'endPosition': 161
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'required',
    'startPosition': 163,
    'endPosition': 170
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 171,
    'endPosition': 171
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</button>',
    'startPosition': 172,
    'endPosition': 180
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n  ',
    'startPosition': 181,
    'endPosition': 183
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<button',
    'startPosition': 184,
    'endPosition': 190
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'disabled',
    'startPosition': 197,
    'endPosition': 204
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'class',
    'startPosition': 211,
    'endPosition': 215
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 216,
    'endPosition': 216
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '\'',
    'startPosition': 217,
    'endPosition': 217
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'button disabled',
    'startPosition': 218,
    'endPosition': 232
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '\'',
    'startPosition': 233,
    'endPosition': 233
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'test',
    'startPosition': 240,
    'endPosition': 243
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 244,
    'endPosition': 244
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 245,
    'endPosition': 245
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'attribute',
    'startPosition': 246,
    'endPosition': 254
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 255,
    'endPosition': 255
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'another',
    'startPosition': 261,
    'endPosition': 267
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 268,
    'endPosition': 268
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '\'',
    'startPosition': 269,
    'endPosition': 269
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'attribute',
    'startPosition': 270,
    'endPosition': 278
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '\'',
    'startPosition': 279,
    'endPosition': 279
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'custom-one',
    'startPosition': 285,
    'endPosition': 294
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 298,
    'endPosition': 298
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</button>',
    'startPosition': 299,
    'endPosition': 307
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n  \n  ',
    'startPosition': 308,
    'endPosition': 313
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<div',
    'startPosition': 314,
    'endPosition': 317
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 319,
    'endPosition': 319
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '\'',
    'startPosition': 320,
    'endPosition': 320
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'only value',
    'startPosition': 321,
    'endPosition': 330
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '\'',
    'startPosition': 331,
    'endPosition': 331
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': '\'only-key\'',
    'startPosition': 333,
    'endPosition': 342
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'another',
    'startPosition': 344,
    'endPosition': 350
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 351,
    'endPosition': 351
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 352,
    'endPosition': 352
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'attr',
    'startPosition': 353,
    'endPosition': 356
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 357,
    'endPosition': 357
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 359,
    'endPosition': 359
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 360,
    'endPosition': 360
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'only-value-2',
    'startPosition': 361,
    'endPosition': 372
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 373,
    'endPosition': 373
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': '"only-key-2"',
    'startPosition': 375,
    'endPosition': 386
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 387,
    'endPosition': 387
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</div>',
    'startPosition': 388,
    'endPosition': 393
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n  \n  ',
    'startPosition': 394,
    'endPosition': 399
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<div',
    'startPosition': 400,
    'endPosition': 403
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 409,
    'endPosition': 409
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '\'',
    'startPosition': 410,
    'endPosition': 410
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'more spaces',
    'startPosition': 411,
    'endPosition': 421
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '\'',
    'startPosition': 422,
    'endPosition': 422
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': '\'key\'',
    'startPosition': 428,
    'endPosition': 432
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'spaced',
    'startPosition': 434,
    'endPosition': 439
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 442,
    'endPosition': 442
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 448,
    'endPosition': 448
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'value',
    'startPosition': 449,
    'endPosition': 453
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 454,
    'endPosition': 454
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': '"key-2"',
    'startPosition': 461,
    'endPosition': 467
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 471,
    'endPosition': 471
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</div>',
    'startPosition': 472,
    'endPosition': 477
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n',
    'startPosition': 478,
    'endPosition': 478
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</div>',
    'startPosition': 479,
    'endPosition': 484
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n\n',
    'startPosition': 485,
    'endPosition': 486
  },
  {
    'type': TOKEN_OPEN_TAG_START,
    'content': '<span',
    'startPosition': 487,
    'endPosition': 491
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'class',
    'startPosition': 493,
    'endPosition': 497
  },
  {
    'type': TOKEN_ATTRIBUTE_ASSIGNMENT,
    'content': '=',
    'startPosition': 498,
    'endPosition': 498
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
    'content': '"',
    'startPosition': 499,
    'endPosition': 499
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE,
    'content': 'another class',
    'startPosition': 500,
    'endPosition': 512
  },
  {
    'type': TOKEN_ATTRIBUTE_VALUE_WRAPPER_END,
    'content': '"',
    'startPosition': 513,
    'endPosition': 513
  },
  {
    'type': TOKEN_ATTRIBUTE_KEY,
    'content': 'custom-attr',
    'startPosition': 515,
    'endPosition': 525
  },
  {
    'type': TOKEN_OPEN_TAG_END,
    'content': '>',
    'startPosition': 526,
    'endPosition': 526
  },
  {
    'type': TOKEN_CLOSE_TAG,
    'content': '</span>',
    'startPosition': 527,
    'endPosition': 533
  },
  {
    'type': TOKEN_TEXT,
    'content': '\n',
    'startPosition': 534,
    'endPosition': 534
  }
]

module.exports = { inputHtml, inputTokens }
