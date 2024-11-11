//
// Constants
//

/** A list of regular expressions that match local IP ranges. */
const localIpRanges: RegExp[] =
[
	// 10.0.0.0 - 10.255.255.255
	/^(::f{4}:)?10\.\d{1,3}\.\d{1,3}\.\d{1,3}/,

	// 127.0.0.0 - 127.255.255.255
	/^(::f{4}:)?127\.\d{1,3}\.\d{1,3}\.\d{1,3}/,

	// 169.254.1.0 - 169.254.254.255
	/^(::f{4}:)?169\.254\.([1-9]|1?\d\d|2[0-4]\d|25[0-4])\.\d{1,3}/,

	// 172.16.0.0 - 172.31.255.255
	/^(::f{4}:)?(172\.1[6-9]|172\.2\d|172\.3[0-1])\.\d{1,3}\.\d{1,3}/,

	// 192.168.0.0 - 192.168.255.255
	/^(::f{4}:)?192\.168\.\d{1,3}\.\d{1,3}/,

	// fc00::/7
	/^f[c-d][0-9a-f]{2}(::1$|:[0-9a-f]{1,4}){1,7}/,

	// fe80::/10
	/^fe[89ab][0-9a-f](::1$|:[0-9a-f]{1,4}){1,7}/,
];

//
// Utility Functions
//

/** Options for the heartbeat function. */
export type HeartbeatOptions =
{
	/** The URL to ping. */
	url: string;

	/** The interval between pings in milliseconds. Optional, defaults to 60000. */
	intervalMilliseconds?: number;

	/** The HTTP method to use. Optional, defaults to "HEAD". */
	method?: string;
};

/**
 * Pings the given URL regularly, like a heartbeat.
 *
 * @param options Options for the heartbeat.
 */
export function heartbeat(options: HeartbeatOptions)
{
	const url = options.url;

	const intervalMilliseconds = options.intervalMilliseconds ?? 60000;

	const method = options.method ?? "HEAD";

	const doHeartbeat = () =>
	{
		fetch(url,
			{
				method,
			});

		setTimeout(doHeartbeat, intervalMilliseconds);
	};

	doHeartbeat();
}

/**
 * Checks if the given IP address is a local IP address.
 *
 * Does NOT check if the given IP address is a valid IP address.
 *
 * @param ipAddress An IP address.
 * @returns Whether the given IP address is a local IP address.
 */
export function isLocalIp(ipAddress: string)
{
	return ipAddress === "::1" || ipAddress === "::1" || localIpRanges.some((range) => range.test(ipAddress));
}