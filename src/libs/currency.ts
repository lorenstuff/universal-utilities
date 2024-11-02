//
// Constants
//

const usdFormatter = new Intl.NumberFormat("en-US",
	{
		style: "currency",
		currency: "USD",
	});

//
// Utility Functions
//

/**
 * Formats an amount of cents as USD.
 *
 * @param cents An amount of cents. For example: 1000 = $10.00
 * @returns The formatted string.
 */
export function formatCentsAsUsd(cents: number)
{
	return usdFormatter.format(cents / 100);
}

/**
 * Formats an amount of dollars as USD.
 *
 * @param dollars An amount of dollars. For example: 10.00 = $10.00
 * @returns The formatted string.
 */
export function formatDollarsAsUsd(dollars: number)
{
	return usdFormatter.format(dollars);
}