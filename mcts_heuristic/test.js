function test(valid_moves) {
  let my_winning_action = new Array(7).fill(0);
  for (let action of valid_moves
    .map((v, i) => (v ? i : -1))
    .filter((i) => i >= 0)) {
    my_winning_action[action] = 1;
  }
  console.log(my_winning_action);
}

const state = [1, 0, 1, 0, 1, 0, 0];

test(state);
