import { v4 } from "uuid";

const Ship = function (length) {
	let _length = length;
	let _name = v4();

	let _shipArray = [];
	for (let i = 0; i < length; i++) {
		_shipArray.push(" ");
	}

	const hit = (index) => {
		if (index < 0 || index > length) throw "Invalid position hit";
		_shipArray.splice(index, 1, "x");
	};

	const isSunk = () => {
		if (_shipArray.every((slot) => slot === "x")) return true;
		return false;
	};

	return {
		get length() {
			return _length;
		},
		get name() {
			return _name;
		},
		get shipArray() {
			return _shipArray;
		},
		hit,
		isSunk,
	};
};

export { Ship };
