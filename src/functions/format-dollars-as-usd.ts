//
// Imports
//

import { usdFormatter } from "../instances/usd-formatter.js";

//
// Function
//

/**
 * Formats an amount of dollars as USD.
 *
 * @param dollars An amount of dollars. For example: 10.00 = $10.00
 * @returns The formatted string.
 */
export function formatDollarsAsUsd(dollars : number) : string
{
	return usdFormatter.format(dollars);
}