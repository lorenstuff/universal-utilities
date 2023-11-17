//
// Imports
//

import { noHeadRequestDomains } from "../data/no-head-request-domains.js";

//
// Function
//

/**
 * Fetches the requested URL and returns its Location header, if it has one.
 *
 * @param url A URL object.
 * @returns The Location header returned by the above URL OR null if it didn't have one.
 */
export async function getUrlLocationHeader(url : URL) : Promise<string | null>
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