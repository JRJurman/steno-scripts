#! /usr/bin/env node

// this file parses a dictionary, and creates 2 new json files
// one that is all the fingerspellings (e.g. every stroke is a single letter)
// and one that is the fingersepllings stripped out.
// it is a modififcation of the phrase-parser.js

const fs = require('fs')
const { entryIsFingerspelling } = require('./dictionary-filters')
const main = require('./top-10000-project-gutenberg-words')

const fingerSpellings = Object.entries(main)
	.filter(entryIsFingerspelling)

const fingerSpellingsObject = Object.fromEntries(fingerSpellings)

const entryIsInFingerspellings = ([chord]) => {
	const fingerspellingChords = Object.keys(fingerSpellingsObject)
	return fingerspellingChords.includes(chord)
}

const withoutFingerSpellings = Object.entries(main)
	.filter((entry) => !entryIsInFingerspellings(entry))

const withoutFingerSpellingsObject = Object.fromEntries(withoutFingerSpellings)

fs.writeFileSync('fingerspellings.json', JSON.stringify(fingerSpellingsObject, null, 2))
fs.writeFileSync('withoutFingerspellings.json', JSON.stringify(withoutFingerSpellingsObject, null, 2))
