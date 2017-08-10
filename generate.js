let fs = require('fs')
let path = require('path')

let tokenize = require('./lib/tokenize')

let template = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf8')

let tokens = tokenize(template)

console.log(tokens)
