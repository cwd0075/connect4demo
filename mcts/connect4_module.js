export class Connect4 {
  constructor() {
    this.row_count = 6;
    this.column_count = 7;
    this.action_size = this.column_count;
    this.in_a_row = 4;
  }
  get_initial_state() {
    //np.zeros((self.row_count, self.column_count))
    //[ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]
    return Array.from({ length: this.row_count }, () =>
      Array(this.column_count).fill(0)
    );
  }
  get_next_state(state, action, player) {
    const row = this.lowest_row(state, action);
    state[row][action] = player;

    return state;
  }
  get_valid_moves(state) {
    // [
    //     [0, 1, -1],
    //     [0, 1, 1],
    //     [-1, -1, 1],
    //   ]
    // mark the lowest row of zero in each column as 1
    // return [ 1, 0, 0 ]

    return state[0].map((col, i) => (col === 0 ? 1 : 0));
  }
  check_win(state, action) {
    if (action === null) {
      return false;
    }
    const row = this.highest_row(state, action);
    const column = action;
    const player = state[row][column];

    return (
      this.count(1, 0, row, column, state, player) >= this.in_a_row - 1 || // vertical
      this.count(0, 1, row, column, state, player) +
        this.count(0, -1, row, column, state, player) >=
        this.in_a_row - 1 || // horizontal
      this.count(1, 1, row, column, state, player) +
        this.count(-1, -1, row, column, state, player) >=
        this.in_a_row - 1 || // top left diagonal
      this.count(1, -1, row, column, state, player) +
        this.count(-1, 1, row, column, state, player) >=
        this.in_a_row - 1 // top right diagonal
    );
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
  lowest_row(state, col) {
    //the top row is index zero,
    //so the place of action is the highest row of the action column
    //row = np.max(np.where(state[:, action] == 0))

    for (let i = state.length - 1; i >= 0; i--) {
      if (state[i][col] === 0) {
        return i;
      }
    }
    return -1; // return -1 if no row with state[i][col] === 0 is found
  }
  highest_row(state, col) {
    //the top row is index zero,
    //find the lowest row of the column where state != 0
    //row = np.min(np.where(state[:, action] != 0))

    for (let i = 0; i < state.length; i++) {
      if (state[i][col] != 0) {
        return i;
      }
    }
    return -1; // return -1 if no row with state[i][col] !=0 is found
  }
  count(offsetRow, offsetColumn, row, column, state, player) {
    for (let i = 1; i < this.in_a_row; i++) {
      const r = row + offsetRow * i;
      const c = column + offsetColumn * i;
      if (
        r < 0 ||
        r >= this.row_count ||
        c < 0 ||
        c >= this.column_count ||
        state[r][c] != player
      ) {
        return i - 1;
      }
    }
    return this.in_a_row - 1;
  }
  get_opponent_value(value) {
    return -value;
  }
  change_perspective(state, player) {
    //return state * player
    return state.map((subArr) => subArr.map((num) => player * num));
  }
}
