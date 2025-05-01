//
// Constants
//

const noHeadRequestDomains =
[
	"mega.co.nz",
	"mega.io",
	"mega.nz",
];

//
// Utility Functions
//

export function getUrlFontAwesomeIconName(stringOrUrl: string | URL)
{
	if (typeof stringOrUrl == "string" && !URL.canParse(stringOrUrl))
	{
		return "fa-solid fa-link";
	}

	const url = new URL(stringOrUrl);

	switch (url.hostname)
	{
		case "bsky.app":
			return "fa-brands fa-bluesky";

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

export async function getUrlLocationHeader(url: URL)
{
	const tryHeadRequest = !noHeadRequestDomains.includes(url.hostname);

	let response: Response | null = null;

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

	if (response == null)
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

export async function getUrlRedirectChain(url: URL, maxChainLength = 20)
{
	const chain: URL[] = [];

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