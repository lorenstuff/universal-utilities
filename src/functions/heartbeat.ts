//
// Function
//

/** Options for the heartbeat function. */
export interface HeartbeatOptions
{
	/** The URL to ping. Pass null to disable the heartbeat. */
	heartbeatUrl : string | null;

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

	if (options.heartbeatUrl == null)
	{
		return;
	}

	//
	// Options
	//

	const heartbeatUrl = options.heartbeatUrl;

	const intervalMilliseconds = options.intervalMilliseconds ?? 60000;

	const method = options.method ?? "HEAD";

	//
	// Do Heartbeat
	//

	const doHeartbeat = () =>
	{
		console.log("[Heartbeat] Pinging heartbeat URL...");

		// noinspection JSIgnoredPromiseFromCall
		fetch(heartbeatUrl,
			{
				method,
			});

		setTimeout(doHeartbeat, intervalMilliseconds);
	};

	doHeartbeat();
}