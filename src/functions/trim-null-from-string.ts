//
// Function
//

/**
 * Trims trailing null characters from a string.
 *
 * @param inputString The input string.
 * @returns The input string without trailing null characters.
 */
export function trimNullFromString(inputString : string) : string
{
	const nullPosition = inputString.indexOf("\0");

	if (nullPosition > -1)
	{
		return inputString.substring(0, nullPosition);
	}

	return inputString;
}