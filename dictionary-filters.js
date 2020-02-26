// helper, calcualate the number of strokes in a chord
const numberOfStrokes = chord => chord.split('/').length

// helper, calculate the number of letters in a translation
const numberOfLetters = translation => translation.length

// helper, check if the number of chords matches the number of letters
const numberOfStrokesMatchesNumberOfLetters = ([chord, translation]) => numberOfStrokes(chord) === numberOfLetters(translation)

// helper, check if every chord includes a star
const everyStrokeHasAStar = ([chord, translation]) => chord.split('/').every(stroke => stroke.match(/.*\*.*/))

// filter to determine if entry is a fingerspelling
const entryIsFingerspelling = (entry) => everyStrokeHasAStar(entry) && numberOfStrokesMatchesNumberOfLetters(entry)

// filter for translations that have spaces
const entryHasSpaces = ([chord, translation]) => translation.match(/.*\s.*/)

// single stroke
const chordHasSingleStroke = ([chord, translation]) => chord.match(/^[^\/]*$/)

module.exports = {
	entryIsFingerspelling,
	entryHasSpaces,
	chordHasSingleStroke,
}
