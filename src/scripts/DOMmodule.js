const createGameboard = (divID) => {
	// create a 10x10 grid
	// --> create 100 divs and append to the div
	const parent = document.querySelector(divID);
	for (let i = 0; i < 100; i++) {
		const tile = document.createElement("div");
		tile.classList.add("game-tile");

		const tileContent = document.createElement("div");
		tileContent.classList.add("tile-content");
		tileContent.setAttribute("data-tile-id", `${i + 1}`);

		tileContent.innerText = "X";
		tile.append(tileContent);
		parent.append(tile);
	}
};

const initGameboards = () => {
	createGameboard("#player-gameboard");
	createGameboard("#computer-gameboard");
};

export { initGameboards };
