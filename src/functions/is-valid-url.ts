//
// Function
//

/**
 * Checks if the given string is a valid URL.
 *
 * @param url A string.
 * @returns Whether or not the string was a valid URL.
 */
export function isValidURL(url : string) : boolean
{
	try
	{
		// If this succeeds, then the string is a valid URL
		new URL(url);

		return true;
	}
	catch (error)
	{
		return false;
	}
}