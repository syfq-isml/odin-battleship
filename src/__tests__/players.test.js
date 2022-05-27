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

// describe("computerPlayer", () => {
//     test("correct")
// })
