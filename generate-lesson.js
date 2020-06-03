// this takes a document, and transforms it into a list of words that typey-type's lesson generator can use

// for now, use single word groups... in the future, we may want to change this
const fs = require('fs')
const doc = require('./notes')

const words = doc.split(' ')

fs.writeFileSync('notes-lesson.txt', words.join('\n'))
