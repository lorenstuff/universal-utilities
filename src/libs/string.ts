//
// Constants
//

const byteSizes = [ "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ];

const oneKiloByte = 1024;

const randomStringCharacters =
[
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"_", "-",
];

//
// Utility Functions
//

/**
 * Formats a number of bytes as a human readable string.
 * 
 * @param bytes A number of bytes.
 * @param numberOfDecimalPlaces The number of decimal places to round to. Optional, defaults to 2.
 * @returns A string representation of the number of bytes, formatted with the appropriate unit. 
 */
export function formatBytes(bytes: number, numberOfDecimalPlaces = 2)
{
    if (bytes === 0)
    {
        return "0 Bytes";
    }

    numberOfDecimalPlaces = numberOfDecimalPlaces < 0 ? 0 : numberOfDecimalPlaces;

    const byteSizeIndex = Math.floor(Math.log(bytes) / Math.log(oneKiloByte));

    return parseFloat((bytes / Math.pow(oneKiloByte, byteSizeIndex)).toFixed(numberOfDecimalPlaces)) + " " + byteSizes[byteSizeIndex];
}

/**
 * Formats a number of seconds as a human readable string.
 * 
 * @param totalSeconds A number of seconds.
 * @returns A human readable string representation of the number of seconds.
 */
export function formatSeconds(totalSeconds: number)
{
	const components: string[] = [];

	const days = Math.floor(totalSeconds / (60 * 60 * 24));

	if (days > 0)
	{
		components.push(days + " day" + (days == 1 ? "" : "s"));
	}

	const hours = Math.floor(totalSeconds % (60 * 60 * 24) / (60 * 60));

	if (hours > 0)
	{
		components.push(hours + " hour" + (hours == 1 ? "" : "s"));
	}

	const minutes = Math.floor(totalSeconds % (60 * 60) / 60);

	if (minutes > 0)
	{
		components.push(minutes + " minute" + (minutes == 1 ? "" : "s"));
	}

	const seconds = Math.floor(totalSeconds % 60);

	if (seconds > 0)
	{
		components.push(seconds + " second" + (seconds == 1 ? "" : "s"));
	}

	return components.join(", ");
}

/**
 * Pads a string with null characters to a given length.
 *
 * @param inputString The input string.
 * @param length Pad to a multiple of this amount. Optional, defaults to 16.
 * @returns A null padded string.
 */
export function padNull(inputString: string, length = 16)
{
	const paddingNeeded = length - (inputString.length % length);

	if (paddingNeeded > 0 && paddingNeeded < length)
	{
		for (let i = 0; i < paddingNeeded; i++)
		{
			inputString += "\0";
		}
	}

	return inputString;
}

/**
 * Generates a cryptographically secure random string.
 *
 * @param length The length of the random string. Optional, defaults to 20.
 * @returns A randomly generated string.
 * @author Lucas Cardellini
 */
export function randomString(length = 20)
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

/**
 * Splits the given string into chunks of the specified length.
 *
 * @param inputString The input string
 * @param chunkLength The length of each chunk in the returned string array.
 * @returns An array of strings, each of which is a chunk of the input string.
 */
export function splitIntoChunks(inputString: string, chunkLength: number)
{
	if (chunkLength < 1)
	{
		chunkLength = 1;
	}

	const matchResult = inputString.match(new RegExp(".{1," + chunkLength.toString() + "}", "gu"));

	return matchResult ?? [];
}

/**
 * Trims trailing null characters from a string.
 *
 * @param inputString The input string.
 * @returns The input string without trailing null characters.
 */
export function trimNull(inputString: string)
{
	const nullPosition = inputString.indexOf("\0");

	if (nullPosition > -1)
	{
		return inputString.substring(0, nullPosition);
	}

	return inputString;
}