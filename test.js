function markLowestZero(state) {
  let output = Array.from({ length: state.length }, () =>
    Array(state[0].length).fill(0)
  );
  for (let col = 0; col < state[0].length; col++) {
    let lowestRow = -1;
    for (let row = state.length - 1; row >= 0; row--) {
      if (state[row][col] === 0) {
        lowestRow = row;
        break;
      }
    }
    if (lowestRow !== -1) {
      output[lowestRow][col] = 1;
    }
  }
  console.log(output);
  return output.flat().map((value) => (value === 1 ? 1 : 0));
}

const state = [
  [0, 1, 0],
  [0, 1, 0],
  [-1, -1, 1],
];
const output = state.flat();
console.log(output);
