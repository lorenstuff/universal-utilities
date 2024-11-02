//
// Constants
//

/** These domains are known to be problematic with HEAD requests, so this array is here to just not even try them. */
export const noHeadRequestDomains: string[] =
[
	"mega.co.nz",
	"mega.io",
	"mega.nz",
];

//
// Utility Functions
//

/**
 * Fetches the requested URL and returns its Location header, if it has one.
 *
 * @param url A URL object.
 * @returns The Location header returned by the above URL OR null if it didn't have one.
 */
export async function getLocationHeader(url: URL)
{
	const tryHeadRequest = !noHeadRequestDomains.includes(url.hostname);

	let response;

	if (tryHeadRequest)
	{
		const controller = new AbortController();

		try
		{
			setTimeout(() =>
			{
				controller.abort();
			}, 3000);

			response = await fetch(url,
				{
					method: "HEAD",
					redirect: "manual",
					signal: controller.signal,
				});
		}
		catch (error)
		{
			// If the request was aborted, then we'll try again with a GET request
		}
	}

	if (response == undefined)
	{
		try
		{
			response = await fetch(url,
				{
					method: "GET",
					redirect: "manual",
				});
		}
		catch (error)
		{
			return null;
		}
	}

	if (!response.ok)
	{
		return null;
	}

	return response.headers.get("Location");
}

/**
 * Gets the chain of URLs that a given URL redirects through.
 *
 * @param url A URL object.
 * @param maxChainLength The maximum length of the redirect chain. Defaults to 20 to match browsers.
 * @returns An array of URLs in the chain. This will be null if something went wrong getting the chain.
 */
export async function getRedirectChain(url: URL, maxChainLength = 20)
{
	const chain: URL[] = [];

	while (chain.length < maxChainLength)
	{
		chain.push(url);

		try
		{
			const locationHeader = await getLocationHeader(url);

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