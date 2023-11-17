//
// Imports
//

import { getUrlLocationHeader } from "./get-url-location-header.js";

//
// Function
//

/**
 * Gets the chain of URLs that a given URL redirects through.
 *
 * @param url A URL object.
 * @param maxChainLength The maximum length of the redirect chain. Defaults to 20 to match browsers.
 * @returns An array of URLs in the chain. This will be null if something went wrong getting the chain.
 */
export async function getRedirectChain(url : URL, maxChainLength = 20) : Promise<URL[] | null>
{
	const chain = [];

	while (chain.length < maxChainLength)
	{
		chain.push(url);

		try
		{
			const locationHeader = await getUrlLocationHeader(url);

			if (locationHeader != undefined)
			{
				if (locationHeader.startsWith("/"))
				{
					// NOTE: Some websites crap all over the original intentions of the Location header by using relative paths
					//	(such as the legacy Donut Team Site lol)
					//
					// This block is to accommodate that nonsense
					url = new URL(locationHeader, url);
				}
				else
				{
					url = new URL(locationHeader);
				}

				continue;
			}
		}
		catch (error)
		{
			return null;
		}

		break;
	}

	return chain;
}