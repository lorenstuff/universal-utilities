//
// Function
//

export function splitArrayIntoChunks<ArrayType>(inputArray: ArrayType[], chunkLength: number)
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