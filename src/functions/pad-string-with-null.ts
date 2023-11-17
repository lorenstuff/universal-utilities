//
// Function
//

/**
 * Pads a string with null characters to a given length.
 *
 * @param inputString The input string.
 * @param length Pad to a multiple of this amount. Optional, defaults to 16.
 * @returns A null padded string.
 */
export function padStringWithNull(inputString : string, length = 16) : string
{
	const paddingNeeded = length - (inputString.length % length);

	if (paddingNeeded > 0 && paddingNeeded < length)
	{
		for (let i = 0; i < paddingNeeded; i++)
		{
			inputString += "\0";
		}
	}

	return inputString;
}