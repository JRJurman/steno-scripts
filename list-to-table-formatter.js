#! /usr/bin/env node

// Notes on how to easily update this keyboard
// 1. use the ORYX configuration tool to setup a layout that you like
// 2. copy the layout into this script
// 3. use the result to parse out which keys you should replace in the existing layouts

// here be javascript
// paste your layout here in whatever format you want
// we'll split it by ',', so as long at it's one giant list we good
const layout = `
KC_ESCAPE,  STN_N2,   STN_N3,   STN_N4,   STN_N5,  STN_N6,  STN_N7,  STN_N8,  STN_N9,  STN_NA,  STN_NB,  KC_BSPACE,
RAISE,      STN_S1,   STN_TL,   STN_PL,   STN_HL,  STN_ST1, STN_ST3, STN_FR,  STN_PR,  STN_LR,  STN_TR,  STN_DR,
LOWER,      STN_S2,   STN_KL,   STN_WL,   STN_RL,  STN_ST2, STN_ST4, STN_RR,  STN_BR,  STN_GR,  STN_SR,  STN_ZR,
KC_LCTRL,   KC_LALT,  KC_LGUI,  STN_A,    STN_O,   XXXXXXX, XXXXXXX, STN_E,   STN_U,   STN_PWR, STN_RE1, STN_RE2
`

/* convert a list into a table like blob */

// split the list by commas
const keys = layout.split(',')
  .map(key => key.trim())

// we know there should be 4 rows, and 12 columns
// it could be the case that the last row has one less value,
// the spacebar he # can be two keys, or not... it's not clear to me
const rows = [
  keys.slice(0, 12),
  keys.slice(12, 24),
  keys.slice(24, 36),
  keys.slice(36, 48)
]

// given a set of keys, and the size of the keyboard,
// return a function that takes in a column, and returns
// the keys for that column
const getKeysForColumn = (keys, rowSize = 12) => column => {
  // calculate the number of rows
  const totalRows = Math.ceil(keys.length / rowSize)
  // make an array for the number of rows, and put an index there
  const indicies = [...Array(totalRows)].map((_, index) => index*rowSize + column)
  // put the keys in that array
  const keysAtIndicies = indicies.map(index => keys[index])
  return keysAtIndicies
}

// make a function for this layout
const getLayoutKeysForColumn = getKeysForColumn(keys)
// make an array of 12 columns, and put all the array of keys in there
const cols = [...Array(12)].map((_, columnIndex) => columnIndex).map(getLayoutKeysForColumn)
cols /*?*/

// take in a list of lengths, and return the max value
const getMaxKey = keySizes => Math.max(...keySizes)

// take the array of array of lengths, and generate a
// flattened list of max lengths for each column
const colKeyLengths = cols.map(col => col.map(key => key.length + 1))
const maxLengths = colKeyLengths.map(getMaxKey)
maxLengths /*?*/

const formatKeyForColumn = (key, column) => `${key},${' '.repeat(maxLengths[column] - key.length)}`

const formattedKeys = rows.map(row => {
  return row.map(formatKeyForColumn)
})

formattedKeys.forEach(row => {
  console.log(row.join(''))
})
