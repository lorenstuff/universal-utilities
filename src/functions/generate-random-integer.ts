//
// Function
//

/**
 * Gets a random integer between the two given numbers.
 *
 * @param minimum The minimum integer. Inclusive.
 * @param maximum The maximum integer. Exclusive.
 * @returns A number between the minimum (inclusive) and maximum (exclusive).
 */
export function generateRandomInteger(minimum : number, maximum : number) : number
{
	minimum = Math.ceil(minimum);
	maximum = Math.floor(maximum);

	return Math.floor((Math.random() * (maximum - minimum)) + minimum);
}