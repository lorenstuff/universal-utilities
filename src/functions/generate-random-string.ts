//
// Imports
//

import { randomStringCharacters } from "../data/random-string-characters.js";

//
// Function
//

/**
 * Generates a cryptographically secure random string.
 *
 * @param length The length of the random string. Optional, defaults to 20.
 * @returns A randomly generated string.
 * @author Lucas Cardellini
 */
export function generateRandomString(length = 20) : string
{
	const Input = new Uint8Array(Math.ceil(length / 4) * 3);

	crypto.getRandomValues(Input);

	let Result = "";
	let I = 0;
	let I2 = 0;

	while (I2 < length)
	{
		// @ts-ignore
		Result += randomStringCharacters[(Input[I] & 252) >> 2];
		++I;
		++I2;

		if (I2 >= length)
		{
			break;
		}

		// @ts-ignore
		Result += randomStringCharacters[(Input[I - 1] & 3) << 4 | (Input[I] & 240) >> 4];
		++I;
		++I2;

		if (I2 >= length)
		{
			break;
		}

		// @ts-ignore
		Result += randomStringCharacters[(Input[I - 1] & 15) << 2 | (Input[I] & 192) >> 6];
		++I2;

		if (I2 >= length)
		{
			break;
		}

		// @ts-ignore
		Result += randomStringCharacters[Input[I] & 63];
		++I;
		++I2;
	}

	return Result;
}