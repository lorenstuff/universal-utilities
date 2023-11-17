//
// SQL Utilities
//

/**
 * Escape a string for use in a SQL LIKE clause.
 *
 * @param inputString The string to escape.
 * @return The escaped string.
 */
export function escapeSqlLikeString(inputString : string) : string
{
	return inputString.replace(new RegExp("\\\\", "g"), "\\" + "\\")
		.replace(new RegExp("_", "g"), "\\" + "_")
		.replace(new RegExp("%", "g"), "\\" + "%");
}