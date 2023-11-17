//
// Function
//

/**
 * Rounds a number to the nearest multiple of another number.
 *
 * @param value The input number.
 * @param nearest The number to round to the nearest multiple of.
 * @returns The rounded number.
 */
export function roundNumberToNearest(value : number, nearest : number) : number
{
	return Math.round(value / nearest) * nearest;
}