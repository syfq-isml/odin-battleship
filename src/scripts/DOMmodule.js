const createGameboard = (divID) => {
	// create a 10x10 grid
	// --> create 100 divs and append to the div
	const parent = document.querySelector(divID);
	for (let i = 0; i < 100; i++) {
		const newDiv = document.createElement("div");
		newDiv.classList.add("game-tile");
		newDiv.innerText = "A";
		parent.append(newDiv);
	}
};

const initGameboards = () => {
	createGameboard("#player-gameboard");
	createGameboard("#computer-gameboard");
};

export { initGameboards };
