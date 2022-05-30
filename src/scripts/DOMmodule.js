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
	let [x, y] = [...arr];
	return humanPlayer.makeAttack(x, y, computerPlayer.gboard);
};

const removeListenersFromTiles = (player, callback) => {
	const tiles = document.querySelectorAll(`[data-tile-id="${player}]"`);
	tiles.forEach((tile) => {
		tile.removeEventListener("click", callback);
	});
};

const ANNOUNCE_gameOver = () => {
	const ann = document.querySelector(".instructions p");
	ann.innerText = "GAME OVER!";
};

const ANNOUNCE_shipHit = (str) => {
	const ann = document.querySelector(".instructions p");
	ann.innerText = str;
};
const ANNOUNCE_shipMiss = (str) => {
	const ann = document.querySelector(".instructions p");
	ann.innerText = str;
};

const RENDER_shipHit = (e) => {
	const tile = e.target;
	tile.innerText = "X";
	tile.classList.add("tile-hit");
};

const RENDER_shipMiss = (e) => {
	const tile = e.target;
	tile.innerText = "o";
	tile.classList.add("tile-miss");
};

export {
	initGameboards,
	addListenersToTiles,
	removeListenersFromTiles,
	DOM_attack,
	ANNOUNCE_gameOver,
	ANNOUNCE_shipHit,
	ANNOUNCE_shipMiss,
	RENDER_shipHit,
	RENDER_shipMiss,
};
