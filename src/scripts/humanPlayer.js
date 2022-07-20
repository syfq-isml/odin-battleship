import { Ship } from "./shipFactory";
import { gameboard } from "./gameboardFactory";
import { getAllAvailableTiles, pickCoordinate } from "./coordinatePicker";

const humanPlayer = (function () {
	let gboard = gameboard();

	const makeAttack = (x, y, gameboard) => {
		return gameboard.receiveAttack(x, y);
	};

	const _getRandomIntInclusive = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
	};

	const _generateRandomOrientation = () => {
		let result = _getRandomIntInclusive(0, 1);
		if (result === 1) {
			return "vertical";
		}
		return "horizontal";
	};

	const randomize = () => {
		const Ship_5 = Ship(5);
		const Ship_4 = Ship(4);
		const Ship_3_1 = Ship(3);
		const Ship_3_2 = Ship(3);
		const Ship_2_1 = Ship(2);
		const Ship_2_2 = Ship(2);

		try {
			let [x1, y1] = pickCoordinate();
			gboard.placeShipOnGameboard(Ship_5, x1, y1, _generateRandomOrientation());

			let [x2, y2] = pickCoordinate();
			gboard.placeShipOnGameboard(Ship_4, x2, y2, _generateRandomOrientation());
			// gboard.placeShipOnGameboard(
			// 	Ship_3_1,
			// 	_getRandomIntInclusive(0, 9),
			// 	_getRandomIntInclusive(0, 9),
			// 	_generateRandomOrientation()
			// );
			// gboard.placeShipOnGameboard(
			// 	Ship_3_2,
			// 	_getRandomIntInclusive(0, 9),
			// 	_getRandomIntInclusive(0, 9),
			// 	_generateRandomOrientation()
			// );
			// gboard.placeShipOnGameboard(
			// 	Ship_2_1,
			// 	_getRandomIntInclusive(0, 9),
			// 	_getRandomIntInclusive(0, 9),
			// 	_generateRandomOrientation()
			// );
			// gboard.placeShipOnGameboard(
			// 	Ship_2_2,
			// 	_getRandomIntInclusive(0, 9),
			// 	_getRandomIntInclusive(0, 9),
			// 	_generateRandomOrientation()
			// );
		} catch (err) {
			console.log(err);
			gboard.removeAllShipData(); // wipe existing gameboard
			randomize();
		}
	};

	return { gboard, makeAttack, randomize };
})();

const computerPlayer = (function () {
	const gboard = gameboard();

	let _isLastMoveHit = false;
	let _lastMoveX;
	let _lastMoveY;

	const changeLastMoveData = (hit, x, y) => {
		_isLastMoveHit = hit;
		_lastMoveX = x;
		_lastMoveY = y;
	};

	const makeAttack = (gameboard) => {
		// array of all not yet hit tiles (next time)

		// get coords
		let x = _getRandomIntInclusive(0, 9);
		let y = _getRandomIntInclusive(0, 9);

		// if (_isLastMoveHit) {
		// 	x = _lastMoveX;
		// 	y = _lastMoveY;
		// }

		// check coords status
		const status = gameboard.board[x][y].status;

		// not hit yet - hit it
		if (status === "not hit yet") {
			// changeLastMoveData(true, x, y);
			return [x, y, gameboard.receiveAttack(x, y)];
		} else {
			// changeLastMoveData(false, x, y);
			return makeAttack(gameboard);
		}
	};

	const _getRandomIntInclusive = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
	};

	const _generateRandomOrientation = () => {
		let result = _getRandomIntInclusive(0, 1);
		if (result === 1) {
			return "vertical";
		}
		return "horizontal";
	};

	const randomize = () => {
		const r_ships = [];

		const Ship_5 = Ship(5);
		const Ship_4 = Ship(4);
		const Ship_3_1 = Ship(3);
		const Ship_3_2 = Ship(3);
		const Ship_2_1 = Ship(2);
		const Ship_2_2 = Ship(2);

		r_ships.push(Ship_5, Ship_4, Ship_3_1, Ship_3_2, Ship_2_1, Ship_2_2);

		while (gboard.allShips.length < 6) {
			try {
				gboard.placeShipOnGameboard(
					r_ships[gboard.allShips.length],
					_getRandomIntInclusive(0, 9),
					_getRandomIntInclusive(0, 9),
					_generateRandomOrientation()
				);
			} catch (err) {
				console.log(err);
			}
		}

		// try {
		// 	gboard.placeShipOnGameboard(
		// 		Ship_5,
		// 		_getRandomIntInclusive(0, 9),
		// 		_getRandomIntInclusive(0, 9),
		// 		_generateRandomOrientation()
		// 	);
		// 	gboard.placeShipOnGameboard(
		// 		Ship_4,
		// 		_getRandomIntInclusive(0, 9),
		// 		_getRandomIntInclusive(0, 9),
		// 		_generateRandomOrientation()
		// 	);
		// 	gboard.placeShipOnGameboard(
		// 		Ship_3_1,
		// 		_getRandomIntInclusive(0, 9),
		// 		_getRandomIntInclusive(0, 9),
		// 		_generateRandomOrientation()
		// 	);
		// 	gboard.placeShipOnGameboard(
		// 		Ship_3_2,
		// 		_getRandomIntInclusive(0, 9),
		// 		_getRandomIntInclusive(0, 9),
		// 		_generateRandomOrientation()
		// 	);
		// 	gboard.placeShipOnGameboard(
		// 		Ship_2_1,
		// 		_getRandomIntInclusive(0, 9),
		// 		_getRandomIntInclusive(0, 9),
		// 		_generateRandomOrientation()
		// 	);
		// 	gboard.placeShipOnGameboard(
		// 		Ship_2_2,
		// 		_getRandomIntInclusive(0, 9),
		// 		_getRandomIntInclusive(0, 9),
		// 		_generateRandomOrientation()
		// 	);
		// } catch (err) {
		// 	console.log(err);
		// 	gboard = gameboard(); // wipe existing gameboard
		// 	randomize();
		// }
	};

	// randomize ships

	return {
		changeLastMoveData,
		gboard,
		makeAttack,
		randomize,
	};
})();

export { humanPlayer, computerPlayer };
