//
// Utility Function
//

export function escapeSqlLikeString(inputString: string)
{
	return inputString.replace(new RegExp("\\\\", "g"), "\\" + "\\")
		.replace(new RegExp("_", "g"), "\\" + "_")
		.replace(new RegExp("%", "g"), "\\" + "%");
}