//
// Constants
//

const europeanCountryCodes: string[] =
[
	"AD", "AL", "AT", "AX", "BA",
	"BE", "BG", "BY", "CH", "CZ",
	"DE", "DK", "EE", "ES", "FI",
	"FO", "FR", "GG", "GI", "GR",
	"HR", "HU", "IE", "IM", "IS",
	"IT", "JE", "LI", "LT", "LU",
	"LV", "MC", "MD", "ME", "MK",
	"MT", "NL", "NO", "PL", "PT",
	"RO", "RS", "RU", "SE", "SI",
	"SJ", "SK", "SM", "UA", "VA",
	"GB",
];

//
// Utility Functions
//

export function isEuropeanCountryCode(countryCode: string)
{
	return europeanCountryCodes.includes(countryCode);
}