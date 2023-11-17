//
// Function
//

/**
 * Rounds a number up to the nearest multiple of another number.
 *
 * @param value The input number.
 * @param nearest The number to round up to the nearest multiple of.
 * @returns The rounded number.
 */
export function roundNumberUpToNearest(value : number, nearest : number) : number
{
	return Math.ceil(value / nearest) * nearest;
}