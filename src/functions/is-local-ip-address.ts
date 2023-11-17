//
// Imports
//

import { localIpRanges } from "../data/local-ip-ranges.js";

//
// Function
//

/**
 * Checks if the given IP address is a local IP address.
 *
 * Does NOT check if the given IP address is a valid IP address.
 *
 * @param ipAddress An IP address.
 * @returns Whether the given IP address is a local IP address.
 */
export function isLocalIpAddress(ipAddress : string) : boolean
{
	return ipAddress === "::1" || ipAddress === "::1" || localIpRanges.some((range) => range.test(ipAddress));
}