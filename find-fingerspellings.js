// this file parses a dictionary, and creates 2 new json files
// one that is all the fingerspellings (e.g. every stroke is a single letter)
// and one that is the fingersepllings stripped out.
// it is a modififcation of the phrase-parser.js
// TODO common functions will probably be put in their own file.


const fs = require('fs')
const main = require('./top-10000-project-gutenberg-words')

const numberOfStrokes = chord => chord.split('/').length
const numberOfLetters = translation => translation.length
const numberOfStrokesMatchesNumberOfLetters = ([chord, translation]) => numberOfStrokes(chord) === numberOfLetters(translation)
const everyStrokeHasAStar = ([chord, translation]) => chord.split('/').every(stroke => stroke.match(/.*\*.*/))

const fingerSpellings = Object.entries(main)
	.filter(everyStrokeHasAStar)
	.filter(numberOfStrokesMatchesNumberOfLetters)

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
