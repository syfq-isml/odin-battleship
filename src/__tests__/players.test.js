import { humanPlayer, computerPlayer } from "../scripts/humanPlayer";
import { Ship } from "../scripts/shipFactory";

describe("humanPlayer", () => {
	test("correctly registers an attack", () => {
		const pship = Ship(2);
		const cship = Ship(2);

		humanPlayer.gboard.placeShipOnGameboard(pship, 0, 0, "vertical");
		computerPlayer.gboard.placeShipOnGameboard(cship, 0, 0, "vertical");
		expect(humanPlayer.makeAttack(0, 0, computerPlayer.gboard)).toBe(
			"A ship was hit!"
		);
	});

	test("correctly registers a miss", () => {
		const pship = Ship(2);
		const cship = Ship(2);

		humanPlayer.gboard.placeShipOnGameboard(pship, 0, 0, "vertical");
		computerPlayer.gboard.placeShipOnGameboard(cship, 0, 0, "vertical");
		expect(humanPlayer.makeAttack(0, 1, computerPlayer.gboard)).toBe(
			"Missed..."
		);
	});
});

const POSSIBLE_VALUES = ["Missed...", "A ship was hit!"];

describe("computerPlayer", () => {
	test("correctly attacks", () => {
		const pship = Ship(2);
		const cship = Ship(2);

		humanPlayer.gboard.placeShipOnGameboard(pship, 0, 0, "vertical");
		computerPlayer.gboard.placeShipOnGameboard(cship, 0, 0, "vertical");
		const result = humanPlayer.makeAttack(0, 0, humanPlayer.gboard);
		expect(result).toBe("A ship was hit!");
		// expect(computerPlayer.makeAttack(humanPlayer.gboard)).toBe(
		// 	"A ship was hit!"
		// );
		expect(() => computerPlayer.makeAttack(humanPlayer.gboard)).toThrow();
		// const result = computerPlayer.makeAttack(humanPlayer.gboard);
		// expect(POSSIBLE_VALUES).toContain(result);
	});

	test.only("recursively attacks until a ship is hit", () => {
		const pship = Ship(2);
		const cship = Ship(2);

		humanPlayer.gboard.placeShipOnGameboard(pship, 0, 0, "vertical");
		computerPlayer.gboard.placeShipOnGameboard(cship, 0, 0, "vertical");
		const result = computerPlayer.makeAttack(humanPlayer.gboard);
		expect(POSSIBLE_VALUES).toContain(result);
	});
});
