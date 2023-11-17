//
// Data
//

/**
 * This is a list of domains where HEAD requests are known to be problematic and should NEVER be used.
 *
 * This exists because some tiny, independent, obscure web services (such as Mega) are unacceptable bullshit and do not respond to HEAD requests.
 */
export const noHeadRequestDomains : string[] =
	[
		"mega.co.nz",
		"mega.io",
		"mega.nz",
	];