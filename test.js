/* A precedence rule is given as “P>E”, which means that letter “P” is followed directly by the letter “E”. Write a function, given an array of precedence rules, that finds the word represented by the given rules.

Note: Each represented word contains a set of unique characters, i.e. the word does not contain duplicate letters.

Examples:
findWord([“P>E”,”E>R”,”R>U”]) // PERU
findWord([“I>N”,”A>I”,”P>A”,”S>P”]) // SPAIN

*/

const findWord = list => {
  let allLetters = [];
  const listParts = list.map(x => x.split(">")).reduce((prev, next) => {
    allLetters = [...allLetters, next[0], next[1]];
    return {
      ...prev,
      [next[0]]: next[1]
    };
  }, {});

  console.log("listParts", listParts);

  const all = allLetters
    .filter((letter, pos) => allLetters.indexOf(letter) === pos)
    .join("")
    .replace(/>/g, "")
    .split("");

  return all
    .sort((a, b) => {
      console.log("pn", a, b);
      return listParts[a] !== b;
    })
    .join("");
};

// console.log(findWord(["P>E", "E>R", "R>U"])); // PERU
// console.log(findWord(["I>N", "A>I", "P>A", "S>P"])); // SPAIN
// console.log(findWord(["U>N", "G>A", "R>Y", "H>U", "N>G", "A>R"])); // HUNGARY
// console.log(findWord(["I>F", "W>I", "S>W", "F>T"])); // SWIFT
console.log(findWord(["R>T", "A>L", "P>O", "O>R", "G>A", "T>U", "U>G"])); // PORTUGAL
// console.log(
//   findWord([
//     "W>I",
//     "R>L",
//     "T>Z",
//     "Z>E",
//     "S>W",
//     "E>R",
//     "L>A",
//     "A>N",
//     "N>D",
//     "I>T"
//   ])
// ); // SWITZERLAND
