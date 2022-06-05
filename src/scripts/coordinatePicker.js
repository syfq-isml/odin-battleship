let availableCoords = [];

for (let i = 0; i < 10; i++) {
	availableCoords.push([]);
	for (let j = 0; j < 10; j++) {
		availableCoords.push([i, j]);
	}
}

const getAllAvailableTiles = (arr) => {
	arr.forEach((ship) => {
		for (let coord of ship) {
			let index = availableCoords.indexOf(coord);
			if (index === -1) {
				continue;
			}
			availableCoords.splice(index, 1);
		}
	});
};

const _getRandomIntInclusive = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const pickCoordinate = () => {
	const num = _getRandomIntInclusive(0, availableCoords.length);
	return availableCoords[num];
};

export { getAllAvailableTiles, pickCoordinate };
