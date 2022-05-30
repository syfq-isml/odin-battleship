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
	let [x, y] = arr;
	return humanPlayer.makeAttack(x, y, computerPlayer.gboard);
};

const removeListenersFromTiles = (callback) => {
	const tiles = document.querySelectorAll(`[data-player="computer"`);
	tiles.forEach((tile) => {
		tile.removeEventListener("click", callback);
	});
};

const ANNOUNCE_gameOver = (str) => {
	const ann = document.querySelector(".instructions p");
	if (str === "win") {
		ann.innerText = "GAME OVER! YOU WIN!";
	} else {
		ann.innerText = "GAME OVER! YOU LOSE!";
	}
};

const ANNOUNCE_shipHit = (player, str) => {
	const ann = document.querySelector(".instructions p");
	if (player === "human") {
		ann.innerText = str;
		return;
	}
	ann.innerText = `Computer's Move: ${str}`;
};
const ANNOUNCE_shipMiss = (player, str) => {
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
	RENDER_shipHit_comp,
	RENDER_shipMiss_comp,
};
