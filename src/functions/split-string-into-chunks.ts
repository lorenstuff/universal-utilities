//
// Function
//

/**
 * Splits the given string into chunks of the specified length.
 *
 * @param inputString The input string
 * @param chunkLength The length of each chunk in the returned string array.
 * @returns An array of strings, each of which is a chunk of the input string.
 */
export function splitStringIntoChunks(inputString : string, chunkLength : number) : string[]
{
	if (chunkLength < 1)
	{
		chunkLength = 1;
	}

	const matchResult = inputString.match(new RegExp(".{1," + chunkLength.toString() + "}", "gu"));

	return matchResult ?? [];
}