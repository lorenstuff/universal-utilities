//
// Utility Functions
//

/**
 * Clamps the given number between the given minimum and maximum values.
 *
 * @param value The value to clamp.
 * @param minimum The minimum value.
 * @param maximum The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, minimum: number, maximum: number)
{
	return Math.min(Math.max(value, minimum), maximum);
}

/**
 * Gets a random integer between the two given numbers.
 *
 * @param minimum The minimum integer. Inclusive.
 * @param maximum The maximum integer. Exclusive.
 * @returns A number between the minimum (inclusive) and maximum (exclusive).
 */
export function randomInteger(minimum: number, maximum: number)
{
	minimum = Math.ceil(minimum);
	maximum = Math.floor(maximum);

	return Math.floor((Math.random() * (maximum - minimum)) + minimum);
}

/**
 * Rounds a number down to the nearest multiple of another number.
 *
 * @param value The input number.
 * @param nearest The number to round down to the nearest multiple of.
 * @returns The rounded number.
 */
export function roundDownToNearest(value: number, nearest: number)
{
	return Math.floor(value / nearest) * nearest;
}

/**
 * Rounds a number to the nearest multiple of another number.
 *
 * @param value The input number.
 * @param nearest The number to round to the nearest multiple of.
 * @returns The rounded number.
 */
export function roundToNearest(value: number, nearest: number)
{
	return Math.round(value / nearest) * nearest;
}

/**
 * Rounds a number up to the nearest multiple of another number.
 *
 * @param value The input number.
 * @param nearest The number to round up to the nearest multiple of.
 * @returns The rounded number.
 */
export function roundUpToNearest(value: number, nearest: number)
{
	return Math.ceil(value / nearest) * nearest;
}