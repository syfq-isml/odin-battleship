import "../node_modules/normalize.css/normalize.css";
import "./stylesheets/style.css";

import {
	initGameboards,
	addListenersToTiles,
	removeListenersFromTiles,
	DOM_attack,
	ANNOUNCE_gameOver,
	ANNOUNCE_shipHit,
	ANNOUNCE_shipMiss,
	RENDER_shipHit,
	RENDER_shipMiss,
	RENDER_shipHit_comp,
	RENDER_shipMiss_comp,
} from "./scripts/DOMmodule";
import { Ship } from "./scripts/shipFactory";
import { humanPlayer, computerPlayer } from "./scripts/humanPlayer";

let computerTurn;

initGameboards();
runNewGame();
console.log(humanPlayer.gboard.board);
console.log(computerPlayer.gboard.board);

function runNewGame() {
	spawnShips(humanPlayer);
	spawnShips(computerPlayer);
	computerTurn = false;
}

// function to get input from human
addListenersToTiles(handleHumanClick);

async function handleHumanClick(e) {
	console.log(e.target);
	let result = DOM_attack(e);
	if (result === "A ship was hit!") {
		RENDER_shipHit(e);
		ANNOUNCE_shipHit("human", result);

		if (computerPlayer.gboard.isAllSunk()) {
			ANNOUNCE_gameOver("win");
			removeListenersFromTiles(handleHumanClick);
			return;
		}
		return;
	}

	if (result === "Missed...") {
		RENDER_shipMiss(e);
		ANNOUNCE_shipHit("human", result);
	}

	// removeListenersFromTiles(handleHumanClick);
	function computerMove() {
		let resultArr = computerPlayer.makeAttack(humanPlayer.gboard);
		console.log(resultArr);
		let [x, y, compResult] = resultArr;
		console.log(x, y, compResult);
		if (compResult === "A ship was hit!") {
			RENDER_shipHit_comp(`${x}${y}`);
			ANNOUNCE_shipHit("computer", compResult);

			if (humanPlayer.gboard.isAllSunk()) {
				ANNOUNCE_gameOver("lose");
				return;
			}

			return computerMove();
		}

		if (compResult === "Missed...") {
			RENDER_shipMiss_comp(`${x}${y}`);
			ANNOUNCE_shipHit("computer", compResult);
		}

		return "Next player";
	}

	computerMove();

	// addListenersToTiles(handleHumanClick);
}

function spawnShips(player) {
	const Ship_5 = Ship(5);
	const Ship_4 = Ship(4);
	const Ship_3_1 = Ship(3);
	const Ship_3_2 = Ship(3);
	const Ship_2_1 = Ship(2);
	const Ship_2_2 = Ship(2);
	player.gboard.placeShipOnGameboard(Ship_5, 0, 0, "vertical");
	player.gboard.placeShipOnGameboard(Ship_4, 4, 3, "horizontal");
	player.gboard.placeShipOnGameboard(Ship_3_1, 7, 1, "horizontal");
	player.gboard.placeShipOnGameboard(Ship_3_2, 6, 5, "vertical");
	player.gboard.placeShipOnGameboard(Ship_2_1, 8, 8, "horizontal");
	player.gboard.placeShipOnGameboard(Ship_2_2, 9, 8, "horizontal");
}

// after each click
// do the attack ==== DOM_attack
// check if all is sunk --> YES: game over, NO: continue ====  DATA:  // DOM: ANNOUNCE_gameOver
// check if a ship is hit --> render YES: X, NO: O + announcement
// check if any ship is sunk --> render YES: all red, NO: continue + announcement
// check if a ship was hit --> YES: dont change turn, NO: change turn + announcement
// remove event listeners

// computer's turn
// computer does a random attack
// check if all is sunk --> YES: game over, NO: continue
// check if a ship is hit --> render YES: X, NO: O + announcement
// check if any ship is sunk --> render YES: all red, NO: continue + announcement
// check if a ship was hit --> YES: dont change turn, NO: change turn
// add event listeners
