//
// Function
//

/**
 * Replaces all matches of a string or regular expression with an async function.
 *
 * @param inputString The input string.
 * @param searchValue The value to search for.
 * @param asyncReplacer A function that returns a promise that resolves to the replacement string.
 * @returns A promise that resolves to the input string with all instances of the search value replaced by the result of the replacer function.
 */
export async function stringReplaceAllAsync(inputString : string, searchValue : string | RegExp, asyncReplacer : (match : string, captureGroups : string[]) => Promise<string>) : Promise<string>
{
	const searchRegExp = typeof (searchValue) === "string" ? new RegExp(searchValue, "g") : searchValue;

	const matches = inputString.matchAll(searchRegExp);

	let lastIndex = 0;

	let result = "";

	for (const match of matches)
	{
		const [ fullMatch, ...captureGroups ] = match;

		const matchIndex = match.index ?? 0;

		const matchLength = fullMatch.length;

		const replacement = await asyncReplacer(fullMatch, captureGroups);

		result += inputString.substring(lastIndex, matchIndex);

		result += replacement;

		lastIndex = matchIndex + matchLength;
	}

	result += inputString.substring(lastIndex);

	return result;
}