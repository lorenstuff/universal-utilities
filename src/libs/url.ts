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

export type GetUrlFontAwesomeIconNameResult =
{
	iconStyle: "fa-brands" | "fa-solid";
	iconName: string;
};

export function getUrlFontAwesomeIconName
(
	stringOrUrl: string | URL,
): GetUrlFontAwesomeIconNameResult
{
	if (typeof stringOrUrl == "string" && !URL.canParse(stringOrUrl))
	{
		return {
			iconStyle: "fa-solid",
			iconName: "fa-link",
		};
	}

	const url = new URL(stringOrUrl);

	switch (url.hostname)
	{
		case "bsky.app":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-bluesky",
			};

		case "facebook.com":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-facebook",
			};

		case "github.com":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-github",
			};

		case "gitlab.com":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-gitlab",
			};

		case "mastodon.social":
		case "mas.to":
		case "home.social": // RIP
		case "social.treehouse.systems":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-mastodon",
			};

		case "twitter.com":
		case "x.com": // Elon Musk is a man child
			return {
				iconStyle: "fa-brands",
				iconName: "fa-twitter",
			};

		case "reddit.com":
		case "new.reddit.com":
		case "old.reddit.com":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-reddit",
			};

		case "steamcommunity.com":
		case "store.steampowered.com":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-steam",
			};

		case "youtube.com":
		case "www.youtube.com":
		case "youtu.be":
			return {
				iconStyle: "fa-brands",
				iconName: "fa-youtube",
			};

		default:
			return {
				iconStyle: "fa-solid",
				iconName: "fa-link",
			};
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