import { humanPlayer, computerPlayer } from "./humanPlayer";

const createGameboard = (divID, playerName) => {
	// create a 10x10 grid
	// --> create 100 divs and append to the div
	const parent = document.querySelector(divID);
	for (let i = 0; i < 100; i++) {
		const tile = document.createElement("div");
		tile.classList.add("game-tile");
		const tileContent = document.createElement("div");
		tileContent.classList.add("tile-content");
		tileContent.classList.add("set-up");
		if (i < 10) {
			tileContent.setAttribute("data-tile-id", `0${i}`);
		} else {
			tileContent.setAttribute("data-tile-id", `${i}`);
		}
		tileContent.setAttribute("data-player", playerName);

		// tileContent.innerText = "X";
		tile.append(tileContent);
		parent.append(tile);
	}
};

const initGameboards = () => {
	createGameboard("#player-gameboard", "human");
	createGameboard("#computer-gameboard", "computer");
};

const addListenersToTiles = (callback) => {
	const tiles = document.querySelectorAll(`[data-player="computer"]`);
	tiles.forEach((tile) => {
		tile.addEventListener("click", callback);
	});
};

const DOM_attack = (e) => {
	// get the tile coordinate
	const coords = e.target.dataset.tileId;
	let arr = Array.from(coords);
	let [x, y] = arr;
	return [x, y, humanPlayer.makeAttack(x, y, computerPlayer.gboard)];
};

const removeListenersFromTiles = (callback) => {
	const tiles = document.querySelectorAll(`[data-player="computer"`);
	tiles.forEach((tile) => {
		tile.removeEventListener("click", callback);
	});
};

const ANNOUNCE_computerDelay = () => {
	const ann = document.querySelector(".instructions p");
	const emph = document.querySelector("#hitMiss");
	emph.innerText = "";
	ann.innerText = "Computer is making a move...";
};

const ANNOUNCE_gameOver = (str) => {
	const emph = document.querySelector("#hitMiss");
	const ann = document.querySelector(".instructions p");
	ann.innerText = "";
	if (str === "win") {
		emph.innerText = "GAME OVER: YOU WIN!";
	} else {
		emph.innerText = "GAME OVER: YOU LOSE!";
	}
};

const ANNOUNCE_shipHit = (player, str, shipSunk) => {
	const ann = document.querySelector(".instructions p");
	const emph = document.querySelector("#hitMiss");
	console.log(emph);
	if (player === "human") {
		if (shipSunk) {
			emph.innerText = "YOU SUNK A SHIP!";
			ann.innerText = "You get another shot!";
		}

		if (str === "A ship was hit!") {
			emph.innerText = "YOU HIT!";
			ann.innerText = "You get another shot!";
			return;
		}
		emph.innerText = "YOU MISSED!";
		ann.innerText = "It's Computer's turn.";
		return;
	}

	if (shipSunk) {
		emph.innerText = "CPU SUNK A SHIP!";
		ann.innerText = "Computer gets another shot!";
		return;
	}

	if (str === "A ship was hit!") {
		emph.innerText = "CPU HIT!";
		ann.innerText = `Computer gets another shot!`;
		return;
	}
	emph.innerText = "CPU MISSED!";
	ann.innerText = "It's your turn!";
	return;
};
const ANNOUNCE_shipMiss = (player, str) => {
	const ann = document.querySelector(".instructions p");
	const emph = document.querySelector("#hitMiss");
	emph.innerText = "";
	ann.innerText = str;
};

const RENDER_shipHit = (e, image) => {
	const tile = e.target;
	// const img = document.createElement("img");
	// img.src = image;
	// tile.append(img);
	tile.innerText = "X";
	tile.classList.add("tile-hit");
};

const RENDER_shipMiss = (e, image) => {
	const tile = e.target;
	// const img = document.createElement("img");
	// img.src = image;
	// tile.append(img);
	tile.innerText = "o";
	tile.classList.add("tile-miss");
};

// const RENDER_shipMiss_comp = (coords) => {
// 	// find the tile that was hit (using coords)
// 	const tile = document.querySelector(`[data-tile-id="${coords}"]`);
// 	tile.innerText = "o";
// 	tile.classList.add("tile-miss");
// };

// const RENDER_shipHit_comp = (coords) => {
// 	const tile = document.querySelector(`[data-tile-id="${coords}"]`);
// 	tile.innerText = "X";
// 	tile.classList.add("tile-hit");
// };

const RENDER_shipOnBoard = (arr) => {
	arr.forEach((item) => {
		item.forEach((coord) => {
			const tile = document.querySelector(`[data-tile-id="${coord}"]`);
			tile.classList.add("has-ship");
		});
	});
};

const RENDER_shipSunk = (e) => {
	const tile = e.target;
	tile.classList.add("tile-sunk");
};

const drawShip = (length, parent) => {
	for (let i = 0; i < length; i++) {
		const newDiv = document.createElement("div");
		newDiv.classList.add("drawn-ship");
		newDiv.setAttribute("data-ship-length", length);
		newDiv.setAttribute("data-placer-name", parent);
		const parentDiv = document.querySelector(parent);
		parentDiv.append(newDiv);
	}
};

const drawAllShips = () => {
	drawShip(5, "#ship5");
	drawShip(4, "#ship4");
	drawShip(3, "#ship3-1");
	drawShip(3, "#ship3-2");
	drawShip(2, "#ship2-1");
	drawShip(2, "#ship2-2");
};

const addEventListenerToShips = (callback) => {
	const ships = document.querySelectorAll("[data-placer-name]");
	ships.forEach((ship) => {
		ship.addEventListener("click", callback);
	});
};

const removeEventListenerToShips = (callback) => {
	const ships = document.querySelectorAll("[data-placer-name]");
	ships.forEach((ship) => {
		ship.removeEventListener("click", callback);
	});
};

const getShipLength = (e) => {
	shipLengthResult = e.target.dataset.shipLength;
};

const handleClickOnBoard = (e) => {
	boardCoords = e.target.dataset.tileId;
};

const addGlobalListeners = (element, eventType, callback) => {
	const elem = document.querySelector(element);
	elem.addEventListener(eventType, callback);
};

const removeGlobalListeners = (element, eventType, callback) => {
	const elem = document.querySelector(element);
	elem.removeEventListener(eventType, callback);
};

const addHoverEffect = (length, orientation) => {
	const hoverController = new AbortController();
	const boardTiles = document.querySelectorAll(".tile-content");
	boardTiles.forEach((tile) => {
		tile.addEventListener(
			"mouseenter",
			(e) => {
				const coords = e.target.dataset.tileId;
				let [x, y] = coords.split("");
				if (orientation === "vertical") {
					for (let i = +x; i < +x + length; i++) {
						if (+x < 0 || +x > 9 || +x + length - 1 > 9) continue;

						const tile = document.querySelector(`[data-tile-id="${i}${+y}"]`);
						// console.log(length);
						// console.log(+x);
						// console.log(+x + length);
						// console.log(tile);
						// console.log(i, y);
						tile.classList.add("has-ship-shadow");
					}
				}

				if (orientation === "horizontal") {
					for (let j = +y; j < +y + length; j++) {
						if (+y + length - 1 > 9 || +y > 9 || +y < 0) continue;

						const tile = document.querySelector(`[data-tile-id="${+x}${j}"]`);
						tile.classList.add("has-ship-shadow");
					}
				}
			},
			{
				signal: hoverController.signal,
			}
		);
		tile.addEventListener("mouseleave", removeShipShadow);
	});
};

const hoverModule = (function () {
	let _length;
	let _orientation;

	const changeParam = (length, orientation) => {
		_length = length;
		_orientation = orientation;
	};

	const addEffect = () => {
		const boardTiles = document.querySelectorAll(".tile-content");
		boardTiles.forEach((tile) => {
			tile.addEventListener("mouseenter", shipShadow);
			tile.addEventListener("mouseleave", removeShipShadow);
		});
	};

	function removeShipShadow() {
		const tile = document.querySelectorAll(".has-ship-shadow");
		tile.forEach((tile) => {
			tile.classList.remove("has-ship-shadow");
		});
	}

	function shipShadow(e) {
		const coords = e.target.dataset.tileId;
		let [x, y] = coords.split("");
		if (_orientation === "vertical") {
			for (let i = +x; i < +x + _length; i++) {
				if (+x < 0 || +x > 9 || +x + _length - 1 > 9) continue;

				const tile = document.querySelector(`[data-tile-id="${i}${+y}"]`);
				// console.log(length);
				// console.log(+x);
				// console.log(+x + length);
				// console.log(tile);
				// console.log(i, y);
				tile.classList.add("has-ship-shadow");
			}
		}

		if (_orientation === "horizontal") {
			for (let j = +y; j < +y + _length; j++) {
				if (+y + _length - 1 > 9 || +y > 9 || +y < 0) continue;

				const tile = document.querySelector(`[data-tile-id="${+x}${j}"]`);
				tile.classList.add("has-ship-shadow");
			}
		}
	}

	const removeEffect = () => {
		const boardTiles = document.querySelectorAll(".tile-content");

		boardTiles.forEach((tile) => {
			tile.removeEventListener("mouseenter", shipShadow);
			tile.removeEventListener("mouseleave", removeShipShadow);
			tile.classList.remove("has-ship-shadow");
		});
	};

	return {
		changeParam,
		addEffect,
		removeEffect,
	};
})();

function removeShipFromPlacer(id) {
	console.log(id);
	const container = document.querySelector("#ship-container");
}

function shipShadow(length, orientation) {
	const coords = e.target.dataset.tileId;
	let [x, y] = coords.split("");
	if (orientation === "vertical") {
		for (let i = +x; i < +x + length; i++) {
			if (+x < 0 || +x > 9 || +x + length - 1 > 9) continue;

			const tile = document.querySelector(`[data-tile-id="${i}${+y}"]`);
			// console.log(length);
			// console.log(+x);
			// console.log(+x + length);
			// console.log(tile);
			// console.log(i, y);
			tile.classList.add("has-ship-shadow");
		}
	}

	if (orientation === "horizontal") {
		for (let j = +y; j < +y + length; j++) {
			if (+y + length - 1 > 9 || +y > 9 || +y < 0) continue;

			const tile = document.querySelector(`[data-tile-id="${+x}${j}"]`);
			tile.classList.add("has-ship-shadow");
		}
	}
}

// function removeShipShadow() {
// 	const tile = document.querySelectorAll(".has-ship-shadow");
// 	tile.forEach((tile) => {
// 		tile.classList.remove("has-ship-shadow");
// 	});
// }

// function removeHoverEffect() {
// 	const boardTiles = document.querySelectorAll(".tile-content");
// 	hoverController.abort();
// 	boardTiles.forEach((tile) => {
// 		tile.removeEventListener("mouseleave", removeShipShadow);
// 		tile.classList.remove("has-ship-shadow");
// 	});
// }

export {
	initGameboards,
	addListenersToTiles,
	removeListenersFromTiles,
	DOM_attack,
	ANNOUNCE_gameOver,
	ANNOUNCE_shipHit,
	ANNOUNCE_shipMiss,
	ANNOUNCE_computerDelay,
	RENDER_shipHit,
	RENDER_shipMiss,
	RENDER_shipOnBoard,
	RENDER_shipSunk,
	drawAllShips,
	addEventListenerToShips,
	removeEventListenerToShips,
	hoverModule,
	removeShipFromPlacer,
};
