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
	ANNOUNCE_computerDelay,
	ANNOUNCE_newGame,
	ANNOUNCE_placeShip,
	ANNOUNCE_placeShip_ERROR,
	RENDER_shipHit,
	RENDER_shipMiss,
	RENDER_shipHit_comp,
	RENDER_shipMiss_comp,
	RENDER_shipOnBoard,
	RENDER_shipSunk,
	drawAllShips,
	addEventListenerToShips,
	removeEventListenerToShips,
	isPlayable,
	hoverModule,
	rotateModule,
} from "./scripts/DOMmodule";
import { Ship } from "./scripts/shipFactory";
import { humanPlayer, computerPlayer } from "./scripts/humanPlayer";

initGameboards();
drawAllShips();
ANNOUNCE_placeShip();
// addeventlistener to placer ( e is on ships)
// addeventlistner to board ( e is on board )

const playBtn = document.querySelector("#play-btn");
playBtn.addEventListener("click", runNewGame);
document.body.addEventListener("click", isPlayable);

function runNewGame() {
	if (humanPlayer.gboard.allShipsCoords.length === 6) {
		// spawnShips(computerPlayer);
		computerPlayer.randomize();

		const shipPlacer = document.querySelector("#ship-placer");
		shipPlacer.style.display = "none";

		document.body.removeEventListener("click", isPlayable);

		const computerBoard = document.querySelector(".computer-side");
		computerBoard.classList.remove("hidden");
		console.log("removed hidden");
		ANNOUNCE_newGame();
		removeEventListenerToShips(placement_part1);
	} else {
		ANNOUNCE_placeShip_ERROR();
	}
}

// SET-UP TIME
addEventListenerToShips(placement_part1);
rotateModule.addEffect();

// function to get input from human
addListenersToTiles(handleHumanClick);

function handleHumanClick(e) {
	console.log(e.target);
	let [x, y, result] = DOM_attack(e);

	x = +x;
	y = +y;

	if (result === "A ship was hit!") {
		RENDER_shipHit(e);

		console.log(humanPlayer.gboard.board);

		if (computerPlayer.gboard.isShipSunk(x, y)) {
			ANNOUNCE_shipHit("human", result, true);
			RENDER_shipSunk(e);
		} else {
			ANNOUNCE_shipHit("human", result, false);
		}

		if (computerPlayer.gboard.isAllSunk()) {
			ANNOUNCE_gameOver("win");
			removeListenersFromTiles(handleHumanClick);
			return;
		}
		return;
	}

	if (result === "Missed...") {
		RENDER_shipMiss(e);
		ANNOUNCE_shipHit("human", result, false);
	}

	function computerMove() {
		let resultArr = computerPlayer.makeAttack(humanPlayer.gboard);
		console.log(resultArr);
		let [x, y, compResult] = resultArr;

		x = +x;
		y = +y;

		if (compResult === "A ship was hit!") {
			RENDER_shipHit_comp(`${x}${y}`);
			computerPlayer.changeLastMoveData(true, x, y);

			if (humanPlayer.gboard.isShipSunk(x, y)) {
				ANNOUNCE_shipHit("computer", compResult, true);
				RENDER_shipSunk(e);
			} else {
				ANNOUNCE_shipHit("computer", compResult, false);
			}

			if (humanPlayer.gboard.isAllSunk()) {
				ANNOUNCE_gameOver("lose");
				return;
			}

			setTimeout(ANNOUNCE_computerDelay, 2000);
			return setTimeout(computerMove, 4000);
		}

		if (compResult === "Missed...") {
			RENDER_shipMiss_comp(`${x}${y}`);
			ANNOUNCE_shipHit("computer", compResult, false);
			computerPlayer.changeLastMoveData(false, x, y);
		}

		return "Next player";
	}

	removeListenersFromTiles(handleHumanClick);
	console.log("removed listeners");

	setTimeout(ANNOUNCE_computerDelay, 2000);
	setTimeout(computerMove, 4000);
	setTimeout(addListenersToTiles, 5000, handleHumanClick);
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

function placement_part1(e) {
	const selectedShip = document.querySelectorAll(
		`[data-placer-name="${e.target.dataset.placerName}"]`
	);
	let length = e.target.dataset.shipLength;
	length = +length;

	selectedShip.forEach((block) => {
		block.classList.add("selected");
	});

	hoverModule.changeLength(length);
	hoverModule.changeOrient(rotateModule.orientation);
	hoverModule.addEffect();

	const boardTiles = document.querySelectorAll(".tile-content");
	boardTiles.forEach((tile) => {
		tile.addEventListener("click", placement_part2);
	});

	const otherShips = document.querySelectorAll(
		`[data-placer-name]:not([data-placer-name="${e.target.dataset.placerName}"])`
	);
	otherShips.forEach((ship) => {
		// ship.classList.add("unavailable");
		ship.removeEventListener("click", placement_part1);
	});

	function placement_part2(e) {
		const coords = e.target.dataset.tileId;
		p_spawnShips(length, coords, rotateModule.orientation);
		RENDER_shipOnBoard(humanPlayer.gboard.allShipsCoords);

		selectedShip.forEach((block) => {
			console.log("Called");
			block.removeEventListener("click", placement_part1);
			block.removeEventListener("click", placement_part2);
		});

		boardTiles.forEach((tile) => {
			tile.removeEventListener("click", placement_part2);
		});
		otherShips.forEach((ship) => {
			ship.addEventListener("click", placement_part1);
		});

		hoverModule.removeEffect();
	}
}

function p_spawnShips(length, coords, orientation) {
	const newShip = Ship(+length);
	let [x, y] = coords.split("");
	console.log(length);
	console.log(x, y);
	console.log(orientation);
	humanPlayer.gboard.placeShipOnGameboard(newShip, +x, +y, orientation);
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
