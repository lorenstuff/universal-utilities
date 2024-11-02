//
// Function
//

/**
 * Splits the given array into chunks of the specified length.
 *
 * @param inputArray The input array.
 * @param chunkLength The length of each chunk in the returned array.
 * @returns An array of arrays, each of which is a chunk of the input array.
 */
export function splitIntoChunks<ArrayType>(inputArray: ArrayType[], chunkLength: number)
{
	if (chunkLength < 1)
	{
		chunkLength = 1;
	}

	const arrays: ArrayType[][] = [];

	for(let i = 0; i < inputArray.length; i += chunkLength)
	{
		arrays.push(inputArray.slice(i, i + chunkLength));
	}

	return arrays;
}