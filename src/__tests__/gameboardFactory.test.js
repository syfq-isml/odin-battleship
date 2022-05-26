import { gameboard } from "../scripts/gameboardFactory";
import { Ship } from "../scripts/shipFactory";

test("Board init correctly", () => {
	const player = gameboard();
	expect(player.board.length).toBe(10);
	expect(player.board[9].length).toBe(10);
	expect(player.board[3][3].isShip).toBe(false);
	expect(player.board[5][6].shipName).toBe(null);
});
test("Tile position set correctly", () => {
	const player = gameboard();
	expect(player.board[0][0].position).toEqual([0, 0]);
	expect(player.board[8][9].position).toEqual([8, 9]);
});

describe("Ship placement shenanigans", () => {
	test("throws exception when out of bounds", () => {
		const player = gameboard();
		const twoShip = Ship(3);

		expect(() =>
			player.placeShipOnGameboard(twoShip, -1, 0, "vertical")
		).toThrow();
		expect(() =>
			player.placeShipOnGameboard(twoShip, 0, -2, "horizontal")
		).toThrow();
		expect(() =>
			player.placeShipOnGameboard(twoShip, 9, 8, "horizontal")
		).toThrow();
		expect(() =>
			player.placeShipOnGameboard(twoShip, 7, 9, "vertical")
		).not.toThrow();
	});
	test("does not place a ship when already has a ship", () => {
		const player = gameboard();
		const twoShip = Ship(2);
		const threeShip = Ship(3);

		player.placeShipOnGameboard(twoShip, 0, 3, "vertical");

		expect(player.board[0][3].isShip).toBe(true);
		expect(() =>
			player.placeShipOnGameboard(threeShip, 0, 3, "horizontal")
		).toThrow();
		expect(() =>
			player.placeShipOnGameboard(threeShip, 1, 1, "horizontal")
		).toThrow();
	});
});
// 	test("Places ship horizontally", () => {
// 		const player = gameboard();
// 		const ship = Ship(2);
// 		player.placeShipOnGameboard(ship, 0, 0, "horizontal");

// 		expect(player.board[0][0]).toEqual({
// 			isShip: true,
// 			position: [0, 0],
// 			shipName: 6,
// 		});
// 		expect(player.board[0][1]).toEqual({
// 			isShip: true,
// 			position: [0, 1],
// 			shipName: 6,
// 		});
// 		expect(player.board[0][2]).toEqual({
// 			isShip: false,
// 			position: [0, 2],
// 			shipName: null,
// 		});
// 		expect(player.board[1][0]).toEqual({
// 			isShip: false,
// 			position: [1, 0],
// 			shipName: null,
// 		});
// 	});
// 	test("Places ship vertically", () => {
// 		const player = gameboard();
// 		const ship = Ship(2);
// 		player.placeShipOnGameboard(ship, 0, 0, "vertical");

// 		expect(player.board[0][0]).toEqual({
// 			isShip: true,
// 			position: [0, 0],
// 			shipName: 6,
// 		});
// 		expect(player.board[0][1]).toEqual({
// 			isShip: false,
// 			position: [0, 1],
// 			shipName: null,
// 		});
// 		expect(player.board[0][2]).toEqual({
// 			isShip: false,
// 			position: [0, 2],
// 			shipName: null,
// 		});
// 		expect(player.board[1][0]).toEqual({
// 			isShip: true,
// 			position: [1, 0],
// 			shipName: 6,
// 		});
// 	});
// });

describe("receiveAttack() function", () => {
	test("communicates to the correct ship that was hit", () => {
		const player = gameboard();
		const twoShip = Ship(2);
		const threeShip = Ship(3);

		player.placeShipOnGameboard(twoShip, 0, 0, "vertical");
		player.placeShipOnGameboard(threeShip, 0, 1, "vertical");
		player.receiveAttack(0, 0);
		expect(twoShip.shipArray).toEqual(["x", " "]);
		expect(threeShip.shipArray).toEqual([" ", " ", " "]);
	});

	test("correctly registers 2 hits and sunk", () => {
		const player = gameboard();
		const twoShip = Ship(2);

		player.placeShipOnGameboard(twoShip, 0, 0, "vertical");

		player.receiveAttack(0, 0);
		player.receiveAttack(1, 0);
		expect(twoShip.shipArray).toEqual(["x", "x"]);
		expect(twoShip.isSunk()).toEqual(true);
	});

	test("registers a miss correctly", () => {
		const player = gameboard();
		const twoShip = Ship(2);
		const threeShip = Ship(3);

		player.placeShipOnGameboard(twoShip, 0, 0, "vertical");
		player.placeShipOnGameboard(threeShip, 0, 1, "vertical");
		player.receiveAttack(9, 9);
		expect(twoShip.shipArray).toEqual([" ", " "]);
		expect(threeShip.shipArray).toEqual([" ", " ", " "]);
		expect(player.board[9][9].status).toEqual("Missed...");
	});
});

describe("isAllSunk?", () => {
	test("returns true when all are sunk", () => {
		const player = gameboard();
		const twoShip = Ship(2);
		player.placeShipOnGameboard(twoShip, 0, 0, "vertical");
		player.receiveAttack(0, 0);
		player.receiveAttack(1, 0);
		expect(player.isAllSunk()).toBe(true);
	});

	test("works properly with multiple ships present", () => {
		const player = gameboard();
		const ship1 = Ship(1);
		const ship2 = Ship(1);
		const ship3 = Ship(1);
		player.placeShipOnGameboard(ship1, 0, 0, "vertical");
		player.placeShipOnGameboard(ship2, 0, 1, "vertical");
		player.placeShipOnGameboard(ship3, 0, 2, "vertical");
		player.receiveAttack(0, 0);
		player.receiveAttack(0, 1);
		player.receiveAttack(0, 2);
		expect(player.isAllSunk()).toBe(true);
	});

	test("works properly with multiple ships present (2)", () => {
		const player = gameboard();
		const ship1 = Ship(2);
		const ship2 = Ship(3);
		const ship3 = Ship(4);
		player.placeShipOnGameboard(ship1, 3, 0, "vertical");
		player.placeShipOnGameboard(ship2, 5, 3, "horizontal");
		player.placeShipOnGameboard(ship3, 8, 6, "horizontal");
		player.receiveAttack(3, 0);
		player.receiveAttack(4, 0);
		player.receiveAttack(5, 3);
		player.receiveAttack(5, 4);
		player.receiveAttack(5, 5);
		player.receiveAttack(8, 6);
		player.receiveAttack(8, 7);
		player.receiveAttack(8, 8);
		player.receiveAttack(8, 9);
		expect(player.isAllSunk()).toBe(true);
	});

	test("multiple ships present, not all are sunk", () => {
		const player = gameboard();
		const ship1 = Ship(2);
		const ship2 = Ship(3);
		const ship3 = Ship(4);
		player.placeShipOnGameboard(ship1, 3, 0, "vertical");
		player.placeShipOnGameboard(ship2, 5, 3, "horizontal");
		player.placeShipOnGameboard(ship3, 8, 6, "horizontal");
		player.receiveAttack(3, 0);
		player.receiveAttack(4, 0);
		player.receiveAttack(5, 3);
		player.receiveAttack(8, 8);
		player.receiveAttack(8, 9);
		expect(player.isAllSunk()).toBe(false);
	});
});
