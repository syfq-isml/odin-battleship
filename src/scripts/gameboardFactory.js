const gameboard = function () {
	let _board = [];

	const _tileFactory = function (isShip, shipName, x, y) {
		return {
			isShip,
			shipName,
			position: [x, y],
			status: "not hit yet",
		};
	};

	// init game board
	for (let i = 0; i < 10; i++) {
		_board.push([]);
		for (let j = 0; j < 10; j++) {
			const newTile = _tileFactory(false, null, i, j);
			_board[i].push(newTile);
		}
	}

	let _allShips = [];

	const _addShipIntoArr = (shipObj) => {
		_allShips.push(shipObj);
	};

	const _isShipTiles = (x, y, length, orientation) => {
		if (orientation === "horizontal") {
			let bool = true;
			for (let j = y; j < length; j++) {
				bool = bool + _board[x][j].isShip;
			}
			if (bool) return true;
			return false;
		}

		if (orientation === "vertical") {
			let bool = true;
			for (let i = x; i < length; i++) {
				bool = bool + _board[x][j].isShip;
			}
			if (bool) return true;
			return false;
		}
	};

	const placeShipOnGameboard = function (shipObj, x, y, orientation) {
		// given x, y coords, set ship to position on the gameboard
		// coords start with [0,0]

		// check for invalid ship positions
		// horizontal
		if (x + shipObj.length - 1 > 9 || y > 9 || y < 0)
			throw "Out of bounds! (Horizontal)";
		if (x < 0 || x > 9 || y + shipObj.length - 1 > 9)
			throw "Out of bounds! (Vertical)";
		// if (_isShipTiles(x, y, shipObj.length, orientation))
		// 	throw "Already has a ship on one of the tiles!";

		// horizontal placement of ships
		if (orientation === "horizontal") {
			for (let j = y; j < shipObj.length; j++) {
				_board[x][j].isShip = true;
				_board[x][j].shipName = shipObj.name;
			}
		}

		// vertical placement of ships
		else if (orientation === "vertical") {
			for (let i = x; i < shipObj.length; i++) {
				_board[i][y].isShip = true;
				_board[i][y].shipName = shipObj.name;
			}
		}
		_addShipIntoArr(shipObj);
	};

	const receiveAttack = function (x, y) {
		// receive coords
		// check if its a ship
		// YES -
		// find the ship
		// call hit(x-coord, y-coord) with
		// NO - show that it is a miss
		if (_board[x][y].isShip) {
			const shipHit = _allShips.find(
				(ship) => ship.name === _board[x][y].shipName
			);
			shipHit.hit(x, y);
			_board[x][y].status = "A ship was hit!";
		} else {
			_board[x][y].status = "Missed...";
		}
	};

	const isAllSunk = () => {
		if (_allShips.every((ship) => ship.isSunk() === true)) return true;

		return false;
	};

	// spread operator to place ships
	return {
		get board() {
			return _board;
		},
		placeShipOnGameboard,
		receiveAttack,
		isAllSunk,
		_isShipTiles,
	};
};

export { gameboard };
