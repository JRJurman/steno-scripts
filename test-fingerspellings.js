#! /usr/bin/env node

// this file parses a dictionary, and creates 2 new json files
// one that is all the fingerspellings (e.g. every stroke is a single letter)
// and one that is the fingersepllings stripped out.
// it is a modififcation of the phrase-parser.js

const fs = require('fs')
const { entryIsFingerspelling } = require('./dictionary-filters')

const dictionaryToTest =  process.argv[2]
const dictionary = require(dictionaryToTest)

const fingerSpellings = Object.entries(dictionary)
	.filter(entryIsFingerspelling)

if (fingerSpellings.length == 0) {
	console.log(`No Fingerspellings were found in ${dictionaryToTest}`)
	return;
}

console.log(`Fingerspellings were found in ${dictionaryToTest}`)
fingerSpellings.forEach((entry) => {
	console.log(entry)
})
