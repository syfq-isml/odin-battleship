const gameboard = function () {
	let _board = [];

	// init game board
	for (let i = 0; i < 10; i++) {
		_board.push([]);
		for (let j = 0; j < 10; j++) {
			_board[i].push("water");
		}
	}

	const placeShipOnGameboard = function (shipObj, x, y, orientation) {
		// given x, y coords, set ship to position on the gameboard
		// coords start with [0,0]

		// horizontal placement of ships
		if (orientation === "horizontal") {
			_board[x].splice(y, shipObj.length, ...shipObj.shipArray);
		}

		// vertical placement of ships
		else if (orientation === "vertical") {
			for (let i = x; i < shipObj.length; i++) {
				_board[i].splice(y, 1, " ");
			}
		}
	};

	const receiveAttack = function (x, y) {
		// receive coords
		// check if its a ship
		// YES - call hit() with
	};

	// helper
	const _isShip = function (x, y) {};

	// spread operator to place ships
	return {
		get board() {
			return _board;
		},
		placeShipOnGameboard,
	};
};

export { gameboard };
