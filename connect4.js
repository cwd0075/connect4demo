import * as t from "./connect4_module.js";
import * as m from "./mcts_module.js";
const connect4 = new t.Connect4();
let args = {
  C: 1.41,
  num_searches: 1000,
};
const mcts = new m.MCTS(connect4, args);
var player = 1; //Player is red
var state;
var gameOver = false;
var rows = 42;

window.startGame = startGame; //if using js6 modules your html events attributes won't work. in that case you must bring your function from global scope to module scope. Just add this to your javascript file: window.functionName= functionName;

startGame();

function startGame() {
  player = 1;
  state = connect4.get_initial_state();

  for (let r = 0; r < rows; r++) {
    // HTML
    let tile = document.createElement("div");
    tile.id = r.toString();
    tile.classList.add("tile");
    tile.addEventListener("click", setPiece);
    document.getElementById("board").append(tile);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  const Id = parseInt(this.id);
  turn(Id);
}

function turn(squareId) {
  //this = div element inside board

  const validMoves = connect4.get_valid_moves(state);
  console.log(state);
  console.log(validMoves);
  console.log(validMoves[squareId]);

  if (validMoves[squareId]) {
    let tile = document.getElementById(squareId.toString());
    if (player == 1) {
      tile.classList.add("red-piece");
    } else {
      tile.classList.add("yellow-piece");
    }
    state = connect4.get_next_state(state, squareId, player);

    const [value, isTerminal] = connect4.get_value_and_terminated(
      state,
      squareId
    );

    if (isTerminal) {
      console.log(state);
      if (value === 1) {
        console.log(player, "won");
        declareWinner(player);
      } else {
        console.log("draw");
        declareWinner(0);
      }
    } else {
      player = connect4.get_opponent(player);
      if (player === -1) {
        aiTurn();
      }
    }
  }
}

function aiTurn() {
  let neutral_state = connect4.change_perspective(state, player);
  let mcts_probs = mcts.search(neutral_state);
  console.log(mcts_probs);
  console.log(mcts.time, " ms");
  //action = np.argmax(mcts_probs)
  let action = mcts_probs.indexOf(Math.max(...mcts_probs));
  let tile = document.getElementById(action.toString());
  if (player == 1) {
    tile.classList.add("red-piece");
  } else {
    tile.classList.add("yellow-piece");
  }

  state = connect4.get_next_state(state, action, player);

  const [value, isTerminal] = connect4.get_value_and_terminated(state, action);

  if (isTerminal) {
    console.log(state);
    if (value === 1) {
      console.log(player, "won");
      declareWinner(player);
    } else {
      console.log("draw");
      declareWinner(0);
    }
  } else {
    player = connect4.get_opponent(player);
  }
}

function declareWinner(won) {
  let winner = document.getElementById("winner");
  if (won == 1) {
    winner.innerText = "Red Wins";
  } else if (won == -1) {
    winner.innerText = "Yellow Wins";
  } else {
    winner.innerText = "Draw";
  }
  gameOver = true;
}
