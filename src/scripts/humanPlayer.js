import { Ship } from "./shipFactory";
import { gameboard } from "./gameboardFactory";
import { getAllAvailableTiles, pickCoordinate } from "./coordinatePicker";

const shuffle = (array) => {
	let oldElement;
	for (let i = array.length - 1; i > 0; i--) {
		let rand = Math.floor(Math.random() * (i + 1));
		oldElement = array[i];
		array[i] = array[rand];
		array[rand] = oldElement;
	}
	return array;
};

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

	let _lastMoveX;
	let _lastMoveY;
	let _offsetX;
	let _offsetY;
	let _origX;
	let _origY;

	const changeLastMoveData = (hit, x, y) => {
		_isLastMoveHit = hit;
		_lastMoveX = x;
		_lastMoveY = y;
	};

	const makeAttack = () => {
		// array of all not yet hit tiles (next time)

		// get coords
		let x = _getRandomIntInclusive(0, 9);
		let y = _getRandomIntInclusive(0, 9);

		// not hit yet - hit it
		if (humanPlayer.gboard.checkIfNotYetHit(x, y)) {
			let result = humanPlayer.gboard.receiveAttack(x, y);

			if (result === "Missed...") {
				currentResult = "random miss";
			} else {
				currentResult = "random hit";

				_lastMoveX = x;
				_lastMoveY = y;

				_origX = x;
				_origY = y;
			}

			return [x, y, result];
		} else {
			makeAttack();
		}
	};

	const attackAdjacent = () => {
		const availableCoords = shuffle([
			[_lastMoveX + 1, _lastMoveY],
			[_lastMoveX - 1, _lastMoveY],
			[_lastMoveX, _lastMoveY + 1],
			[_lastMoveX, _lastMoveY - 1],
		]);

		for (let coords of availableCoords) {
			let [x, y] = coords;
			if (x < 0 || x > 9 || y < 0 || y > 9) continue;

			if (humanPlayer.gboard.checkIfNotYetHit(x, y)) {
				let result = humanPlayer.gboard.receiveAttack(x, y);

				if (result === "Missed...") {
					currentResult = "adjacent miss";
				} else {
					currentResult = "adjacent hit";

					_offsetX = x - _lastMoveX;
					_offsetY = y - _lastMoveY;

					_lastMoveX = x;
					_lastMoveY = y;
				}

				return [x, y, result];
			} else continue;
		}

		// if everything is attacked alr, then random attack
		makeAttack();
	};

	const attackSameDirection = () => {
		let x = _lastMoveX + _offsetX;
		let y = _lastMoveY + _offsetY;

		if (x < 0 || x > 9 || y < 0 || y > 9) attackOppositeDirection();

		if (humanPlayer.gboard.checkIfNotYetHit(x, y)) {
			let result = humanPlayer.gboard.receiveAttack(x, y);

			if (result === "Missed...") {
				currentResult = "same dir miss";
			} else {
				currentResult = "same dir hit";

				_lastMoveX = x;
				_lastMoveY = y;
			}

			return [x, y, result];
		} else {
			makeAttack();
		}
	};

	const attackOppositeDirection = () => {
		_offsetX *= -1;
		_offsetY *= -1;

		let x = _origX + _offsetX;
		let y = _origY + _offsetY;

		if (humanPlayer.gboard.checkIfNotYetHit(x, y)) {
			let result = humanPlayer.gboard.receiveAttack(x, y);

			if (result === "Missed...") {
				currentResult = "same dir miss";
			} else {
				currentResult = "same dir hit";

				_lastMoveX = x;
				_lastMoveY = y;
			}

			return [x, y, result];
		} else {
			makeAttack();
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
	};

	let currentResult = "";
	const decisionMap = new Map([
		["", makeAttack],
		["random hit", attackAdjacent],
		["random miss", makeAttack],
		["adjacent hit", attackSameDirection],
		["adjacent miss", attackAdjacent],
		["same dir hit", attackSameDirection],
		["same dir miss", attackOppositeDirection],
	]);

	const changeCurrentResult = (result) => {
		currentResult = result;
	};

	return {
		get isLastMoveHit() {
			return _isLastMoveHit;
		},
		get currentResult() {
			return currentResult;
		},
		get decisionMap() {
			return decisionMap;
		},
		changeCurrentResult,
		changeLastMoveData,
		gboard,
		makeAttack,
		randomize,
		attackAdjacent,
		attackSameDirection,
	};
})();

export { humanPlayer, computerPlayer };
