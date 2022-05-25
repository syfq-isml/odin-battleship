import { gameboard } from "../scripts/gameboardFactory";
import { Ship } from "../scripts/shipFactory";

test("Board init correctly", () => {
	const player = gameboard();
	expect(player.board.length).toBe(10);
	expect(player.board[9].length).toBe(10);
});

describe("Ship placement shenanigans", () => {
	test("Places ship horizontally", () => {
		const player = gameboard();
		const ship = Ship(2);
		player.placeShipOnGameboard(ship, 0, 0, "horizontal");

		expect(player.board[0][0]).toEqual(" ");
		expect(player.board[0][1]).toEqual(" ");
		expect(player.board[0][2]).toEqual("water");
		expect(player.board[1][0]).toEqual("water");
	});
	test("Places ship vertically", () => {
		const player = gameboard();
		const ship = Ship(2);
		player.placeShipOnGameboard(ship, 0, 0, "vertical");

		expect(player.board[0][0]).toEqual(" ");
		expect(player.board[1][0]).toEqual(" ");
		expect(player.board[0][1]).toEqual("water");
		expect(player.board[2][0]).toEqual("water");
	});
});

describe("receiveAttack() function", () => {
	test("");
});
