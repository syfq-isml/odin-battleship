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
	return humanPlayer.makeAttack(x, y, computerPlayer.gboard);
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

const ANNOUNCE_shipHit = (player, str) => {
	const ann = document.querySelector(".instructions p");
	const emph = document.querySelector("#hitMiss");
	console.log(emph);
	if (player === "human") {
		if (str === "A ship was hit!") {
			emph.innerText = "YOU HIT!";
			ann.innerText = "You get another shot!";
			return;
		}
		emph.innerText = "YOU MISSED!";
		ann.innerText = "It's Computer's turn.";
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

const RENDER_shipMiss_comp = (coords) => {
	// find the tile that was hit (using coords)
	const tile = document.querySelector(`[data-tile-id="${coords}"]`);
	tile.innerText = "o";
	tile.classList.add("tile-miss");
};

const RENDER_shipHit_comp = (coords) => {
	const tile = document.querySelector(`[data-tile-id="${coords}"]`);
	tile.innerText = "X";
	tile.classList.add("tile-hit");
};

const RENDER_shipOnBoard = (arr) => {
	arr.forEach((item) => {
		item.forEach((coord) => {
			const tile = document.querySelector(`[data-tile-id="${coord}"]`);
			tile.classList.add("has-ship");
		});
	});
};

const drawShip = (length, parent) => {
	for (let i = 0; i < length; i++) {
		const newDiv = document.createElement("div");
		newDiv.classList.add("drawn-ship");
		newDiv.setAttribute("data-ship-length", length);
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
	const ships = document.querySelectorAll("[data-ship-length]");
	ships.addEventListener("click", callback);
};

const getShipLength = (e) => {
	shipLengthResult = e.target.dataset.shipLength;
};

const handleClickOnBoard = (e) => {
	boardCoords = e.target.dataset.tileId;
};

const everything = () => {};

const addGlobalListeners = (element, eventType, callback) => {
	const elem = document.querySelector(element);
	elem.addEventListener(eventType, callback);
};

const removeGlobalListeners = (element, eventType, callback) => {
	const elem = document.querySelector(element);
	elem.removeEventListener(eventType, callback);
};

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
	RENDER_shipHit_comp,
	RENDER_shipMiss_comp,
	RENDER_shipOnBoard,
	drawAllShips,
	addGlobalListeners,
	removeGlobalListeners,
};
