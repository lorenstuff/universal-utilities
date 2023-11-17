//
// Function
//

/** Options for the heartbeat function. */
export interface HeartbeatOptions
{
	/** The URL to ping. Pass null to disable the heartbeat. */
	url : string | null;

	/** The interval between pings, in milliseconds. Optional, defaults to 60000. */
	intervalMilliseconds? : number;

	/** The HTTP method to use. Optional, defaults to HEAD. */
	method? : "GET" | "POST" | "HEAD";
}

/**
 * Pings the given URL regularly, like a heartbeat.
 *
 * @param options Options for the heartbeat.
 */
export function heartbeat(options : HeartbeatOptions) : void
{
	//
	// Check for Heartbeat URL
	//

	if (options.url == null)
	{
		return;
	}

	//
	// Options
	//

	const url = options.url;

	const intervalMilliseconds = options.intervalMilliseconds ?? 60000;

	const method = options.method ?? "HEAD";

	//
	// Do Heartbeat
	//

	const doHeartbeat = () =>
	{
		console.log("[Heartbeat] Pinging heartbeat URL...");

		// noinspection JSIgnoredPromiseFromCall
		fetch(url,
			{
				method,
			});

		setTimeout(doHeartbeat, intervalMilliseconds);
	};

	doHeartbeat();
}