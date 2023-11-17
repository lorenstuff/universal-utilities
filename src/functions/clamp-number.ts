//
// Function
//

/**
 * Clamps the given number between the given minimum and maximum values.
 *
 * @param value The value to clamp.
 * @param minimum The minimum value.
 * @param maximum The maximum value.
 * @returns The clamped value.
 */
export function clampNumber(value : number, minimum : number, maximum : number) : number
{
	return Math.min(Math.max(value, minimum), maximum);
}