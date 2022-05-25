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
		).toThrow();
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

test("ship tiles", () => {
	const player = gameboard();
	const twoShip = Ship(2);
	player.placeShipOnGameboard(twoShip, 0, 3, "vertical");
	expect(player.board[0][3].isShip).toBe(true);
	expect(player.board[1][3].isShip).toBe(true);
	expect(player._isShipTiles(0, 3, 3, "horizontal")).toBe(true);
	expect(player._isShipTiles(1, 3, 3, "horizontal")).toBe(true);
	// expect(player._isShipTiles(0, 4, 3, "horizontal")).toBe(false);
	expect(player._isShipTiles(5, 5, 3, "horizontal")).toBe(false);
	expect(player._isShipTiles(1, 1, 2, "horizontal")).toBe(true);
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
		const ship1 = Ship(2);
		const ship2 = Ship(2);
		const ship3 = Ship(2);
		player.placeShipOnGameboard(ship1, 0, 0, "vertical");
		player.placeShipOnGameboard(ship2, 0, 0, "horizontal");
		player.placeShipOnGameboard(ship1, 0, 0, "vertical");
		player.receiveAttack(0, 0);
		player.receiveAttack(1, 0);
		expect(player.isAllSunk()).toBe(true);
	});
});
