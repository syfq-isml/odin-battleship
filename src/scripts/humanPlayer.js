import { gameboard } from "./gameboardFactory";

const humanPlayer = (function () {
	const gboard = gameboard();

	const makeAttack = (x, y, gameboard) => {
		return gameboard.receiveAttack(x, y);
	};

	return { gboard, makeAttack };
})();

const computerPlayer = (function () {
	const gboard = gameboard();

	const makeAttack = (gameboard) => {
		// array of all not yet hit tiles (next time)

		// get coords
		let x = _getRandomIntInclusive(0, 9);
		let y = _getRandomIntInclusive(0, 9);
		// check coords status
		const status = gameboard.board[x][y].status;

		// not hit yet - hit it
		if (status === "not hit yet") {
			return gameboard.receiveAttack(x, y);
		} else {
			makeAttack(gameboard);
		}
	};

	const _getRandomIntInclusive = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
	};

	return { gboard, makeAttack };
})();

export { humanPlayer, computerPlayer };
