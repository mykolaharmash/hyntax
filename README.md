# Hyntax

Simple HTML tokenizer and parser .

__Not base on regexps.__ It's a legit [parser](https://en.wikipedia.org/wiki/Parsing).  
__Supports streaming.__ Can tokenize and parse HTML in chunks, meaning it can handle memory-sensitive scenarios.  
__Zero dependency.__ Hyntax is written from scratch as a case-study. You can read about how it works in [my blog post](https://nikgarmash.com).

## Usage

```javascript
const { tokenize, parse } = require('hyntax')

const inputHTML = `
<html>
  <body>
      <input type="text" placeholder="Don't type"> 
      <button>Don't press</button>
  </body>
</html>
`

const { tokens } = tokenize(inputHTML)
const { ast } = parse(tokens)

console.log(tokens, ast)
```

## Usage in Browser

You can bundle Hyntax into your front-end application without any problems with Webpack, Rollup or Browserify. Single Node.js specific piece of code is native Node's streams. All mentioned bundlers have a client-side replacement for stream.

All components of Hyntax are separate files, so you can bundle only parts you actually need.

```javascript
import tokenize from 'hyntax/lib/tokenize'
import parse from 'hyntax/lib/parse'

import TokenizeStream from 'hyntax/lib/tokenize-stream'
import ParseStream from 'hyntax/lib/parse-stream'
```

## Streaming

Stream parsing can be handy in a couple of cases:

* You have a huge HTML and you don't want or can't store it whole in the memory
* You need to generate tokens and AST while HTML is still being downloaded

With Hyntax it looks like this

```javascript
const https = require('https')

const { TokenizeStream, ParseStream } = require('hyntax')

https.get('https://www.wikipedia.org', (res) => {
  const tokenizeStream = new TokenizeStream()
  const parseStream = new ParseStream()
  
  res.pipe(tokenizeStream).pipe(parseStream)

  tokenizeStream.on('data', (tokens) => {
    console.log(tokens)
  })
  
  parseStream.on('data', (ast) => {
    console.log(ast) 
  })
}).on('error', (err) => {
  throw err;
})
```

## Tokenizer

Hyntax has tokenizer as a separate module, you can use output tokens on their own or pass them further to a parser to build an AST. You can use default Hyntax parser or write a custom one which builds AST for some specific need.

#### Types of tokens

Each token has a `type` property. All possible values of this field you can 
find in a [lib/constants/token-types.js](https://github.com/).

Here is high level overview of all possible tokens.

![Overview of all possible tokens](./tokens-list.png)

#### Interface

```javascript
tokenize(input, [existingState], [options])
```

##### Arguments
For basic usage ```input``` argument is sufficient, all other arguments are 
optional and needed only for stream parsing.

```input<String>```

HTML string to process

```existingState<Object>```

When input is coming in chunks and multiple calls of ```tokenize(chunk)``` are required, existingState parameter is used to pass result of previous call.

Default value — ```undefined```.

```options<Object>```

```options.isFinalChunk<Boolean>```

Signal that current input chunk is the last one. Used for creating of the last 
token which does not have explicit ending. For example when input is 
interrupted in the middle of a tag content without reaching closing tag.

Default value — ```true```  

```options.positionOffset<Number>```

Number of characters processed by previous ```tokenize(chunk)``` calls. 
Needed for correct calculation of tokens position when input is coming in 
chunks.

Default value — ```0```  

##### Returns

Tokenizer returns an object with ```state<Object>``` and ```tokens<Array>``` properties. 

```state<Object>```

Is the current state of tokenizer. It can be persist and passed to the next tokenizer call if input is coming in chunks.

```tokens<Array>```

Each item of the array is a ```token<Object>```.

```token.type<String>```

One of the types from [lib/constants/token-types.js](https://github.com/).

```token.content<String>```

Piece of original HTML input which was recognized as a token.

```token.startPosition<Number>```

Index of the first token's character in the input HTML string.

```token.endPosition<Number>```

Index of the last token's character in the input HTML string.






