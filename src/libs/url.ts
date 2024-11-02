//
// Constants
//

/** These domains are known to be problematic with HEAD requests, so this array is here to just not even try them. */
const noHeadRequestDomains =
[
	"mega.co.nz",
	"mega.io",
	"mega.nz",
];

//
// Utility Functions
//

/**
 * Gets a Font Awesome icon class name that corresponds to a given URL.
 * 
 * @param stringOrUrl A string or a URL object.
 * @returns A Font Awesome icon class name that corresponds to the given URL.
 */
export function getFontAwesomeIconName(stringOrUrl: string | URL)
{
	try 
	{
		const url = new URL(stringOrUrl);

		switch (url.hostname)
		{
			case "facebook.com":
				return "fa-brands fa-facebook";
	
			case "github.com":
				return "fa-brands fa-github";
	
			case "gitlab.com":
				return "fa-brands fa-gitlab";
	
			case "mastodon.social":
			case "mas.to":
			case "home.social": // RIP
			case "social.treehouse.systems":
				return "fa-brands fa-mastodon";
	
			case "twitter.com":
			case "x.com": // Elon Musk is a man child
				return "fa-brands fa-twitter";
	
			case "reddit.com":
			case "new.reddit.com":
			case "old.reddit.com":
				return "fa-brands fa-reddit";
	
			case "steamcommunity.com":
			case "store.steampowered.com":
				return "fa-brands fa-steam";
	
			case "youtube.com":
			case "www.youtube.com":
			case "youtu.be":
				return "fa-brands fa-youtube";
	
			default:
				return "fa-solid fa-link";
		}
	}
	catch (error)
	{
		return "fa-solid fa-link";
	}
}

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