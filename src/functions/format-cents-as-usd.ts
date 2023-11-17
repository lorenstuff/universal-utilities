//
// Imports
//

import { usdFormatter } from "../instances/usd-formatter.js";

//
// Function
//

/**
 * Formats an amount of cents as USD.
 *
 * @param cents An amount of cents. For example: 1000 = $10.00
 * @returns The formatted string.
 */
export function formatCentsAsUsd(cents : number) : string
{
	return usdFormatter.format(cents / 100);
}