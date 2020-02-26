#! /usr/bin/env node

// this script parses a dictionary file and generates a
// text file with each phrase (that is, single stroke -> many words)
// the text file is in a format that is friendly for typey-type
// TODO these functions should be extracted out

const fs = require('fs')
const main = require('./main')
const { entryHasSpaces, chordHasSingleStroke } = require('./dictionary-filters')

// map from entry to string
const entryToString = ([chord, translation]) => `${translation}\t${chord}`

const phrases = Object.entries(main)
	.filter(entryHasSpaces)
	.filter(entry => chordHasSingleStroke(entry)) // single stroke
	// .filter(entry => !chordHasSingleStroke(entry)) // multi stroke
	.map(entryToString)
	.join('\n')

fs.writeFileSync('phrases.txt', phrases)
