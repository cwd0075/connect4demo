export class Connect4 {
  constructor() {
    this.row_count = 6;
    this.column_count = 7;
    this.action_size = this.row_count * this.column_count;
  }
  get_initial_state() {
    //np.zeros((self.row_count, self.column_count))
    //[ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]
    return Array.from({ length: this.row_count }, () =>
      Array(this.column_count).fill(0)
    );
  }
  get_next_state(state, action, player) {
    const row = Math.floor(action / this.column_count);
    const column = action % this.column_count;
    state[row][column] = player;
    return state;
  }
  get_valid_moves(state) {
    // [
    //     [0, 1, 0],
    //     [0, 1, 0],
    //     [-1, -1, 1],
    //   ]
    // mark the lowest row of zero in each column as 1
    // return [ [ 0, 0, 0 ], [ 1, 0, 1 ], [ 0, 0, 0 ] ]

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

    //[  [1, 1, 0],  [0, 1, 0],  [0, 1, 1]] >> [  1, 1, 0, 0, 1, 0, 0, 1, 1]
    return output.flat().map((value) => (value === 1 ? 1 : 0));
  }
  check_win(state, action) {
    if (action === null) {
      return false;
    }
    const row = Math.floor(action / this.column_count);
    const column = action % this.column_count;
    const player = state[row][column];
    const winningArrays = [
      [0, 1, 2, 3],
      [41, 40, 39, 38],
      [7, 8, 9, 10],
      [34, 33, 32, 31],
      [14, 15, 16, 17],
      [27, 26, 25, 24],
      [21, 22, 23, 24],
      [20, 19, 18, 17],
      [28, 29, 30, 31],
      [13, 12, 11, 10],
      [35, 36, 37, 38],
      [6, 5, 4, 3],
      [0, 7, 14, 21],
      [41, 34, 27, 20],
      [1, 8, 15, 22],
      [40, 33, 26, 19],
      [2, 9, 16, 23],
      [39, 32, 25, 18],
      [3, 10, 17, 24],
      [38, 31, 24, 17],
      [4, 11, 18, 25],
      [37, 30, 23, 16],
      [5, 12, 19, 26],
      [36, 29, 22, 15],
      [6, 13, 20, 27],
      [35, 28, 21, 14],
      [0, 8, 16, 24],
      [41, 33, 25, 17],
      [7, 15, 23, 31],
      [34, 26, 18, 10],
      [14, 22, 30, 38],
      [27, 19, 11, 3],
      [35, 29, 23, 17],
      [6, 12, 18, 24],
      [28, 22, 16, 10],
      [13, 19, 25, 31],
      [21, 15, 9, 3],
      [20, 26, 32, 38],
      [36, 30, 24, 18],
      [5, 11, 17, 23],
      [37, 31, 25, 19],
      [4, 10, 16, 22],
      [2, 10, 18, 26],
      [39, 31, 23, 15],
      [1, 9, 17, 25],
      [40, 32, 24, 16],
      [9, 17, 25, 33],
      [8, 16, 24, 32],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [1, 2, 3, 4],
      [5, 4, 3, 2],
      [8, 9, 10, 11],
      [12, 11, 10, 9],
      [15, 16, 17, 18],
      [19, 18, 17, 16],
      [22, 23, 24, 25],
      [26, 25, 24, 23],
      [29, 30, 31, 32],
      [33, 32, 31, 30],
      [36, 37, 38, 39],
      [40, 39, 38, 37],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
    ];
    for (let y = 0; y < winningArrays.length; y++) {
      let square1 = state.flat()[winningArrays[y][0]];
      let square2 = state.flat()[winningArrays[y][1]];
      let square3 = state.flat()[winningArrays[y][2]];
      let square4 = state.flat()[winningArrays[y][3]];
      if (
        square1 === player &&
        square2 === player &&
        square3 === player &&
        square4 === player
      ) {
        return true;
      }
    }
    return false;
  }
  get_value_and_terminated(state, action) {
    if (this.check_win(state, action)) {
      return [1, true];
    }
    if (
      //np.sum(self.get_valid_moves(state)) == 0
      this.get_valid_moves(state).reduce((sum, value) => sum + value, 0) === 0
    ) {
      return [0, true];
    }
    return [0, false];
  }
  get_opponent(player) {
    return -player;
  }
  get_opponent_value(value) {
    return -value;
  }
  change_perspective(state, player) {
    //return state * player
    return state.map((subArr) => subArr.map((num) => player * num));
  }
}
