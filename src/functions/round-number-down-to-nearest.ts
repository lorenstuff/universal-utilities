//
// Function
//

/**
 * Rounds a number down to the nearest multiple of another number.
 *
 * @param value The input number.
 * @param nearest The number to round down to the nearest multiple of.
 * @returns The rounded number.
 */
export function roundNumberDownToNearest(value : number, nearest : number) : number
{
	return Math.floor(value / nearest) * nearest;
}