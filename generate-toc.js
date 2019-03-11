#!/usr/bin/env node

const fs = require('fs')
const remark = require('remark')
const toc = require('remark-toc')

const readme = fs.readFileSync('./README.md').toString()

remark()
  .use(toc)
  .process(readme, function(err, file) {
    if (err) {
      throw err
    }

    fs.writeFileSync('./README.md', file)
  })
