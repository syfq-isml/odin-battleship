const gameboard = function () {
	let _board = [];

	const _tileFactory = function (isShip, shipName, x, y) {
		return {
			isShip,
			shipName,
			shipIndex: null,
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
		if (orientation === "vertical") {
			let newArr = [];
			for (let i = x; i < x + length; i++) {
				newArr.push(_board[i][y].isShip);
			}
			if (newArr.some((item) => item === true)) return true;
		}

		if (orientation === "horizontal") {
			let newArr = [];
			for (let j = y; j < y + length; j++) {
				newArr.push(_board[x][j].isShip);
			}
			if (newArr.some((item) => item === true)) return true;
		}
		return false;
	};

	const placeShipOnGameboard = function (shipObj, x, y, orientation) {
		// given x, y coords, set ship to position on the gameboard
		// coords start with [0,0]

		if (_isShipTiles(x, y, shipObj.length, orientation))
			throw "Already has a ship on one of the tiles!";

		// horizontal placement of ships
		if (orientation === "horizontal") {
			if (y + shipObj.length - 1 > 9 || y > 9 || y < 0)
				throw "Out of bounds! (Horizontal)";

			let indexCounter = 0;
			for (let j = y; j < y + shipObj.length; j++) {
				_board[x][j].isShip = true;
				_board[x][j].shipName = shipObj.name;
				_board[x][j].shipIndex = indexCounter;
				indexCounter++;
			}
		}

		// vertical placement of ships
		else if (orientation === "vertical") {
			if (x < 0 || x > 9 || x + shipObj.length - 1 > 9)
				throw "Out of bounds! (Vertical)";

			let indexCounter = 0;
			for (let i = x; i < x + shipObj.length; i++) {
				_board[i][y].isShip = true;
				_board[i][y].shipName = shipObj.name;
				_board[i][y].shipIndex = indexCounter;
				indexCounter++;
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
		if (!_checkIfNotYetHit(x, y)) throw `${_board[x][y].status}`;

		if (_board[x][y].isShip) {
			const shipHit = _allShips.find(
				(ship) => ship.name === _board[x][y].shipName
			);
			shipHit.hit(_board[x][y].shipIndex);
			_board[x][y].status = "A ship was hit!";
			return _board[x][y].status;
		} else {
			_board[x][y].status = "Missed...";
			return _board[x][y].status;
		}
	};

	const _checkIfNotYetHit = (x, y) => {
		if (_board[x][y].status === "not hit yet") return true;
		else return false;
	};

	const isAllSunk = () => {
		if (_allShips.every((ship) => ship.isSunk() === true)) return true;

		return false;
	};

	// const getAllAvailableTiles = () => {
	// 	let arr = [];
	// 	for (let i = 0; i < 10; i++) {
	// 		arr.push([]);
	// 		for (let j = 0; j < 10; j++) {
	// 			if(_board[i][j].status === "not yet hit"){
	// 				arr[i].push(newTile);
	// 			}
	// 		}
	// 	}
	// };

	// spread operator to place ships
	return {
		get board() {
			return _board;
		},
		placeShipOnGameboard,
		receiveAttack,
		isAllSunk,
	};
};

export { gameboard };
