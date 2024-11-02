//
// Utility Function
//

/**
 * Escape a string for use in a SQL LIKE clause.
 *
 * @param inputString The string to escape.
 * @return The escaped string.
 */
export function escapeLikeString(inputString: string)
{
	return inputString.replace(new RegExp("\\\\", "g"), "\\" + "\\")
		.replace(new RegExp("_", "g"), "\\" + "_")
		.replace(new RegExp("%", "g"), "\\" + "%");
}