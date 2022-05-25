import { Ship } from "../scripts/shipFactory";

describe("Ship factory function", () => {
	test("Ship has a length of 4", () => {
		const ship = Ship(4);
		expect(ship.length).toBe(4);
		expect(ship.shipArray.length).toBe(4);
		expect(ship.shipArray).toEqual([" ", " ", " ", " "]);
	});
	test("hit() correctly hits at a given index", () => {
		const ship = Ship(4);
		ship.hit(0);
		expect(ship.shipArray).toEqual(["x", " ", " ", " "]);
		ship.hit(1);
		expect(ship.shipArray).toEqual(["x", "x", " ", " "]);
	});
	test("throws exception & keeps original array when wrong index is given", () => {
		const ship = Ship(4);
		expect(() => ship.hit(5)).toThrow();
		expect(ship.shipArray).toEqual([" ", " ", " ", " "]);
	});
	test("isSunk() correctly returns bool value", () => {
		const ship = Ship(2);
		ship.hit(0);
		ship.hit(1);
		expect(ship.shipArray).toEqual(["x", "x"]);
		expect(ship.isSunk()).toBe(true);

		const ship2 = Ship(2);
		ship2.hit(0);
		expect(ship2.isSunk()).toBe(false);
	});
});
